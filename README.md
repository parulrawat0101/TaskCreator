# TaskCreator
Goal:- Task Creator tool is a script which takes "2019 task ID" and its corresponding "Jira ID" as input, runs the rebase tool and eventually task is pushed to main repository.



How to use:-

Initialize init.json as follows-
path: Path of your sim5service repository in local
enable: Set as true to use the tool
stepConcatenation: Update the path to step-concatenation-tool (Rebase tool)

{
    "path":"E:\\Sim5GIT\\Modules\\sim5service",
    "enable":"true",
    "stepConcatenation": "E:\\Sim5GIT\\tools-investigations-2019\\tools\\step-concatenation-tool"
}



Command:- 
npm start <2019 TASK ID> <JIRA ID>
  
  
