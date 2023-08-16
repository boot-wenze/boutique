pipeline {
    
    agent any
    
    stages{
        
        stage("Git pull project"){
            
            steps {
                git branch : "master" , url : "https://github.com/boot-wenze/boutique.git"
            }
        }

      stage("Maven Build"){
            
            steps{
                bat "mvn package"
            }
            
        }
        
        stage("Create Docker Image"){
            
            steps{
                bat "docker build -t iamtheblur14/boutique:v1.0.0 ."
            }
            
        }
        
    }
    
}
