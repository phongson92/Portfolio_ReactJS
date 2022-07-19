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
                    rgs '-u 0:0 -v /tmp:/root/.cache'
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
                docker rmi $(docker images -f "dangling=true" -q)
            }
        }

        stage ("Push Image"){
            agent any
            steps {
            withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
            sh "docker push ${DOCKER_IMAGE}:latest"
        }   
            //clean to save disk
            sh "docker image rm ${DOCKER_IMAGE}:latest"
            }
        }
        stage ("Deploy Image"){
            agent any
            steps {
                ssh -o StrictHostKeyChecking=no -i /var/jenkins_home/.ssh/web-key.pem root@103.92.25.173 << EOF
                
                // stop and remove all running container
                docker ps -aq | xargs docker stop | xargs docker rm
                // run image
                docker run -it -d --name reactjs -p 8080:80 $DOCKER_IMAGE:latest
            }
        }
        
    }//end stages
        

    
}//end pipeline
