pipeline {
    
    agent any
    
    stages{
        
        stage("Git pull project"){
            
            steps {
                git branch : "master" , url : "https://github.com/boot-wenze/boutique.git"
            }
        }
        
        stage('SonarQube Analysis') {
          def scannerHome = tool 'scanner';
          withSonarQubeEnv() {
            bat %scannerHome%"/bin/sonar-scanner"
          }
        }
        stage("Create Docker Image"){
            
            steps{
                bat "docker build -t iamtheblur14/boutique:v1.0.0 ."
            }
            
        }
        
    }
    
}
