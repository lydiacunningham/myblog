# GIT conflicts what’s the problem ?
Apr 5, 2018

![](https://cdn-images-1.medium.com/max/800/1*hJ2sU-w4aGEzPm8kvnzjPw.jpeg?style=centerme)

When I begin with Git in college I was pretty much working on my own and commit to master was the norm. After that I started working as a developer, working in teams became a reality and git conflict’s raised there ugly **<<<<< HEAD**

## What is a conflict?
Your local codebase on your PC is out of sync with the remote codebase on Github you wish to merge into.

## Workflow
Where to start ? The beginning I suppose , **Fork** the repo you wish to work on, clone your fork to your local PC, I use the ssh url as easier in the long run see the github doc’s for setup info on adding ssh keys.

```bash
git clone git@github.com:yourUsername/RepoName.git
```

This act automatically adds a remote location called **origin** to your local git config. To keep in sync with the orignal repo you will need to add a remote location that points at it.

```bash
git add remote upstream git@github.com:upstreamUsername/RepoName.git
```

After adding the remotes you can check your remotes

```bash
git remote --v
>origin  git@github.com:yourUsername/RepoName.git (fetch)   
>origin  git@github.com:yourUsername/RepoName.git (push)              >upstream git@github.com:upstreamUsername/RepoName.git (fetch)   >upstream git@github.com:upstreamUsername/RepoName.git (push)
```

So your ready to start working on some codebase first thing to check is if you are in sync with upstream, you can then create a branch to work on. Its is worth your while investing in a command line tooling that show your branch name in your prompt e.g. [ohmyzsh](https://github.com/robbyrussell/oh-my-zsh)

```bash
git pull upstream master
git checkout -b branchname
```

So you have done everything right and you start coding and then its time to create a pull request against the upstream repo.

First lets talk about staging in git. Using **git status** will show you the changes made in your local repo, e.g.

![](https://cdn-images-1.medium.com/max/800/1*ngu9OPHFNV1cx36n9FN2hg.png?style=centerme)

The long and the short of it is files that are staged will be committed, **git add filename** will add a file to the staging area and **git rm filename** will remove a file from the staging area. If there are files like IDE generated files you may want to add and configure a **.gitignore** file to your repo. I won’t go into it but there is some good documentation on [.gitignore here](https://www.atlassian.com/git/tutorials/saving-changes/gitignore).

So you commit your changes and push the changes to your fork. The following lines will add all files to the staging area , commit them and then push your branchname to your fork.

```bash
git add --all
git commit -m 'this is where your commit messeage would go'
git push origin branchname
```

When you open the Github in a browser you will see a button to create a pull request

![](https://cdn-images-1.medium.com/max/800/1*5mWR6EaQcVf4nbvmvmtjTQ.png?style=centerme)

So the Pull request gets created and if everthing is good you should be able to merge you branch into the master of upstream.

## When things go wrong
So here is where things can go wrong. While you were coding another developer submitted a Pull request and it was approved and merged with master. So now the **upstream master** has changed and your **local master** is now out of sync and you will see an error like

![](https://cdn-images-1.medium.com/max/800/1*6bczdL6znl8lvVEagk82IQ.png?style=centerme)

So how to fix your branch, you first must fix the local master branch

```bash
git checkout master
git pull upsteam master
```

Now that master is fixed it time to fix the branchname branch

```bash
git checkout branchname 
git rebase master
```

You may be fortunate at this point and find that none of the changes to upsteam master are on the same files as your own and the rebase completes without issue. Or you may see this something like this e.g.

![](https://cdn-images-1.medium.com/max/800/1*sz-e8xhCtUIwlP-SeKScDg.jpeg?style=centerme)

Don’t worry this just means that **upstream master** version of a file you were working on has changed and you will need to reconcile the differences.

You can resolve the conflict by editing the file, you can accept the incoming change or the current change or a combination of both. Once you have decide remove the unused code and the <<<<<<< HEAD , ======= and >>>>>> branchname.

I recommend tooling for sorting out these conflicts . [Vs Code](https://code.visualstudio.com/) IDE has some nice inbuilt conflict resolution features . Clicking on the links auto edit the file.

![](https://cdn-images-1.medium.com/max/800/1*hVqanWLjYJxJrTZ6ROUNdQ.png?style=centerme)

If you are looking for a stand alone tool you might try [Meld](http://meldmerge.org/help/resolving-conflicts.html), click on the left or right pane changes to apply to the center and save.

![](https://cdn-images-1.medium.com/max/800/1*yQi8RsNLdrAyXRlWog8Jow.png?style=centerme)

So once you have your conflicts addressed you need to add your changes to the staging area, then you need to finish the rebase

```bash
git add --all
git rebase --continue
```

So the branch is now fixed you need to push the changes to branch name on your fork. If you try to push the rebased branch back to a remote repository, Git will prevent you from doing so. Use the force flag -f on push.

```bash
git push -f origin branchname
```

Only ever using the -f flag when pushing to your own fork as it can be a destructive command if you are unsure what you are doing.