# L1TaskCreator

Aim:- L1 Task Creator tool is a tool script which takes "2019 task ID"  as input, runs the rebase tool for one more number of tasks provided in input.json



How to use:-

1. Initialize "config.json" as follows-
    path: Path of your sim5service repository in local
    enable: Set as true to use the tool
    stepConcatenation: Path to step-concatenation-tool (Rebase tool)
    For example-

    {
        "path":"E:\\Sim5GIT\\Modules\\sim5service",
        "enable":"true",
        "stepConcatenation": "E:\\Sim5GIT\\tools-investigations-2019\\tools\\step-concatenation-tool"
    }
2. Initialize "input.json" :-
    input.json is a json file which has an array of "tasks", could be single or multiple
    Enter all the tasks to be rebased in that array.

3. Initialize "step-concatenation-tool"
    Follow README of step-concatenation-tool

Command:- 
npm start
  
Note:- 
       1. Tool assumes that the corresponding 2016 task (from which rebase is to be done) has the same chapter and serial as 2019 task.
       For example:- if a task to be rebased is "GO19.XL.06.6A.17.A1", then tool will rebase from task "GO16.XL.06.6A.17.A1"