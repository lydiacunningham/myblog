# Enforcing Git Commit Message Style

![](https://cdn-images-1.medium.com/max/800/1*iQSjyiA3zwGcshOGipSiXA.png?style=centerme)

I was working on a project that wanted commit messages in the following formats

```bash
feat(feature-name): message text here (AEROGEAR-Number)
fix(feature-name): etc...
docs(feature-name): etc...
breaking(feature-name): etc...
```

This was a pain to enforce and check manually so we decided to automate the check for this. Firstly I wrote a script to check the existing branch commits and see if they match the format

```bash
#!/bin/bash

commit_message_check (){
      # Get the current branch and apply it to a variable
      currentbranch=`git branch | grep \* | cut -d ' ' -f2`

      # Gets the commits for the current branch and outputs to file
      git log $currentbranch --pretty=format:"%H" --not master > shafile.txt

      # loops through the file an gets the message
      for i in `cat ./shafile.txt`;
      do 
      # gets the git commit message based on the sha
      gitmessage=`git log --format=%B -n 1 "$i"`

      ####################### TEST STRINGS comment out line 13 to use #########################################
      #gitmessage="feat sdasdsadsaas (AEROGEAR-asdsada)"
      #gitmessage="feat(some txt): some txt (AEROGEAR-****)"
      #gitmessage="docs(some txt): some txt (AEROGEAR-1234)"
      #gitmessage="fix(some txt): some txt (AEROGEAR-5678)"
      #########################################################################################################
      
      # Checks gitmessage for string feat, fix, docs and breaking, if the messagecheck var is empty if fails
      messagecheck=`echo $gitmessage | grep -w "feat\|fix\|docs\|breaking"`
      if [ -z "$messagecheck" ]
      then 
            echo "Your commit message must begin with one of the following"
            echo "  feat(feature-name)"
            echo "  fix(fix-name)"
            echo "  docs(docs-change)"
            echo " "
      fi
      # check the gitmessage for the Jira number
      messagecheck=`echo $gitmessage | grep "(AEROGEAR-"`
      if  [ -z "$messagecheck" ]
      then 
            echo "Your commit message must end with the following"
            echo "  (AEROGEAR-****)"
            echo "Where **** is the Jira number"
            echo " " 
      fi
      messagecheck=`echo $gitmessage | grep ": "`
      if  [ -z "$messagecheck" ]
      then 
            echo "Your commit message has a formatting error please take note of special characters '():' position and use in the example below"
            echo "   type(some txt): some txt (AEROGEAR-****)"
            echo "Where 'type' is fix, feat, docs or breaking and **** is the Jira number"
            echo " "
      fi

      # All checks run at the same time by pipeing from one grep to another
      messagecheck=`echo $gitmessage | grep -w "feat\|fix\|docs\|breaking" | grep "(AEROGEAR-" | grep ": "`



      # check to see if the messagecheck var is empty
      if [ -z "$messagecheck" ]
      then  
            echo "The commit message with sha: '$i' failed "
            echo "Please review the following :"
            echo " "
            echo $gitmessage
            echo " "
            rm shafile.txt >/dev/null 2>&1
            set -o errexit
      else
            echo "$messagecheck"
            echo "'$i' commit message passed"
      fi  
      done
      rm shafile.txt  >/dev/null 2>&1
}

# Calling the function
commit_message_check 
```

I copied the script to a script directory of the root of the project and was initially using it with Circle ci to check the commit during a build.

```yml
steps:      
  - checkout      
  - run: ./scripts/commit-filter-check.sh
```

It was decided that a local check would more useful, we then decided to use githooks to run the script. There is a **.git/hook** directory in every git project with sample git hooks.

![](https://cdn-images-1.medium.com/max/800/1*Nw2sU5pVk16Sq63zxtvwzQ.png?style=centerme)

Remove the **.sample** and the hook script becomes live in this case I used the **commit-msg** git hook and use it to run my script. The hook is triggered by a failure with an exit 1

```bash
#!/bin/sh

# Run the script and get the return code if successful of if fails
./scripts/commit-filter-check.sh && rc=$? || rc=$?
echo return code : $rc
if $rc == 1
then
	echo "Script return code 1 so commit failed"
	exit 1
else
	echo "No error returned so commit successful"
fi
```

Only issue was the **.git** directory never gets seen by git commit. So I needed a way to push my changes and allow others to use them. Moving commit-msg file to a **.githook** directory allows it to be committed. You can then add a line to the setup script of the project to create a sym link to the local **.git/hooks** directory

```bash
ln -sf $$PWD/.githooks/* $$PWD/.git/hooks/
```

Now every commit message is checked and will fail if it doesn’t match the format


