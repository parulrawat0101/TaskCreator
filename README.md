# TaskCreator
Aim:- Task Creator tool is a script which takes "2019 task ID" and its corresponding "Jira ID" as input, runs the rebase tool and eventually task is pushed to main repository TaskXmls2019.



How to use:-

Initialize "init.json" as follows-
path: Path of your sim5service repository in local
enable: Set as true to use the tool
stepConcatenation: Update the path to step-concatenation-tool (Rebase tool)
For example-

{
    "path":"E:\\Sim5GIT\\Modules\\sim5service",
    "enable":"true",
    "stepConcatenation": "E:\\Sim5GIT\\tools-investigations-2019\\tools\\step-concatenation-tool"
}



Command:- 
npm start <2019 TASK ID> <JIRA ID>
  
Note:- 1. Tool assumes that git status of TaskXmls2019 is clean.
       2. Tool assumes that the corresponding 2016 task (from which rebase is to be done) has the same chapter and serial as 2019 task.
       For example:- if a task to be rebased is "GO19.XL.06.6A.17.A1", then tool will rebase from task "GO16.XL.06.6A.17.A1"