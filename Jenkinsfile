pipeline {
    agent none

    environment {
        DOCKER_IMAGE= "phongson92/portfolio-reactjs"
    }

    stages {
        
        stage ("Test") {
            agent {
                docker {
                    image 'node:13-alpine'
                }
            }
            steps {
                sh "npm install"
                sh "npm test"
            
    }
        }

        stage ("Build"){
            agent any
            steps {
                sh 'docker build -t $DOCKER_IMAGE:latest .'
            }
        }

        stage ("Push Image"){
            agent any
            steps {
            withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
            sh "docker push ${DOCKER_IMAGE}:latest"
        }
            }
        }
        
    }//end stages
        

    
}//end pipeline
