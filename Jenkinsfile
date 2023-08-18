pipeline {
    
    agent any
    
    stages{
        
        stage("Git pull project"){
            
            steps {
                git branch : "master" , url : "https://github.com/boot-wenze/boutique.git"
            }
        }
        
        stage('SonarQube Analysis') {
          steps{
            withSonarQubeEnv("sonarqube") {
              bat "sonar-scanner.bat -D'sonar.projectKey=boutique' -D'sonar.sources=.' -D'sonar.host.url=http://localhost:9000' -D'sonar.token=sqp_1d60837f5a5c200cdd5af54f136d90ec495d9c0e'"
            }
          }  
        }
        stage("Create Docker Image"){
            
            steps{
                bat "docker build -t iamtheblur14/boutique:v1.0.0 ."
            }
            
        }
        
    }
    
}
