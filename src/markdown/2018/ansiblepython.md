# Write a Ansible module with Python

![](https://cdn-images-1.medium.com/max/800/1*aVz3yH6SXGuCxU4pmr-KZw.jpeg)

Ansible has a number of modules available [here](https://docs.ansible.com/ansible/latest/modules/modules_by_category.html). But I wished to write my own. Ansible has integration with Python to enable this. I will start with a hello world module and work on from there.

## Hello World Module

Create a playbook to call your new module with hello_world.yml, note we call the module with hello_world: the module will return the result and debug will display result.

```yml
- hosts: localhost

  tasks:
  - name: Test that my hello_world module works
    hello_world: 
    register: result

  - debug: var=result  
```

Create library directory with a python file in the root of your project

```
hello_world.yml
[library]
   |_ hello_world.py
```
Add the following content to the hello_world.py

```python
#!/usr/bin/python

from ansible.module_utils.basic import *

def main():
    module = AnsibleModule(argument_spec={})
    theReturnValue = {"hello": "world"}
    module.exit_json(changed=False, meta=theReturnValue)

if __name__ == '__main__':
    main()
```

> You need **#!/usr/bin/python**

> You need to import the ansible.module_utils.basic to use **AnsibleModule**

> You need a **main()**

> AnsibleModule is used to pass parameters in and out of the module it this case we are only passing back meta with the value of **theReturnValue**.

> **Note**: The argument_spec is an empty object to show nothing is being passed into the AnsibleModule.

That’s it the hello_world playbook can be run with
```bash
$ ansible-playbook hello_world.yml
```

This will return a hello world when run as the meta data

![](https://cdn-images-1.medium.com/max/800/1*qwqmhXM2n2VFpu7JbENfaQ.png?style=centerme)


That is it your hello world module finished.

## Pass variables in and out of a Python Module

I was working on an upgrade script and I needed to bump the Semantic Versioning i.e. bumping the minor version of 1.1.1, Ansible handles this poorly as it is not a float or a int. So writing a small module to handle this makes sense. To do this I need to pass a variable to the python module and then bump the version and pass a value back.

Again create a file `version_change.yml` in the root directory and a library directory with your python file called `version_change.py`

```yml
- hosts: localhost

  tasks:
  - name: Test that my change_version module works
    version_change: 
      version_name: "Before"
      version_no:  1.1.1 
      unchanged_value: "This will pass through"
    register: result

  - debug: var=result
```

So as an example I am passing three variable to the module called version_change (version_name, version_no and unchanged_value) in the version_changed.py file

```py
#!/usr/bin/python

from ansible.module_utils.basic import *

def main():

    fields = {
        "version_no": {"default": True, "type": "str"},
        "version_name": {"default": True, "type": "str"},
        "unchanged_value": {"default": True, "type": "str"}
    }

    module = AnsibleModule(argument_spec=fields)
    # change the name
    module.params.update({"version_name": "After"})
    # bump minor and patch version
    mylist = module.params["version_no"].split('.')
    mylist[2] = str(int(mylist[2]) + 2)
    mylist[1] = str(int(mylist[1]) + 1)
    mystr= '.'.join(mylist)
    module.params.update({"version_no": mystr})

    
    module.exit_json(changed=True, meta=module.params)
    
```

> We handle the incoming variables with the `fields` dictionary we can use “default” or “required” Boolean and a “type” in this case we use “str”

> All variables need to be declared in the fields dict, weather you use them or not

> The `fields` are passed in as `argument_spec` to the `AnsibleModule`

> We can then access the `module.params` using python dictionary methods

> We then pass the `module.params` back as meta to the playbook

> We can then run the playbook with
```bash
$ ansible-playbook version_change.yml
```
And you get the result , as you can see the unchanged_value remains unchanged and , the version_name and version_no are changed

![](https://cdn-images-1.medium.com/max/800/1*xJZOjUG7ULrZYfE09rU7Qw.png?style=centerme)

Not needed but as a final step you can add string for documentation and examples at the top of the module. See the following [Git repo](https://github.com/austincunningham/python-ansible.git) for the code for this basic demo.