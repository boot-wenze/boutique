pipeline {
    
    agent any
    
    stages{
        
        stage("Git pull project"){
            
            steps {
                git branch : "master" , url : "https://github.com/boot-wenze/boutique.git"
            }
        }
        
        stage("Create Docker Image"){
            
            steps{
                pwsh "docker build -t iamtheblur14/boutique:v1.0.0 ."
            }
            
        }
        
    }
    
}
