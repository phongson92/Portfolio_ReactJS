pipeline {
    agent none

    environment {
        DOCKER_IMAGE= "phongson92/portfolio-reactjs"
    }

    stages {
        stage ("Test") {
            //when { equals expected: true, actual: Test }   
            agent {
                docker {
                    image 'node:13-alpine'
                    args '-u 0:0 -v /tmp:/root/.cache'
                }
            }
            options {
                ansiColor('xterm')
            }
            steps {
                 echo '\033[35m THIS IS TEST STAGE \033[0m'
                sh "npm install"
                sh "npm test"
            
             }
        }

        // stage ("Build"){
            
        //     agent any
        //     steps {
        //         sh 'docker build -t $DOCKER_IMAGE:latest .'
                 
        //     }
        // }

        // stage ("Push Image"){
        //     agent any
        //     steps {
        //     withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
        //     sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
        //     sh "docker push ${DOCKER_IMAGE}:latest"
        // }   
        //     //clean to save disk
        //     sh "docker image rm ${DOCKER_IMAGE}:latest"
        //     }
        // }
         stage ("Build and Push Image"){
            agent any
             options {
                ansiColor('xterm')
            }
            environment {
                registryCredential = 'docker-hub'
            }
            steps {
                  echo '\033[35m THIS IS BUILD AND PUSH STAGE \033[0m'
                script {
                    dockerimage = docker.build DOCKER_IMAGE
                    docker.withRegistry('', registryCredential){
                        dockerimage.push("$BUILD_NUMBER")
                        dockerimage.push('latest')
                     //clean to save disk
                    sh "docker image rm ${DOCKER_IMAGE}:latest"
                    sh "docker image rm ${DOCKER_IMAGE}:$BUILD_NUMBER"
                    }
                    
                }
           
            }
        }
        stage ("Deploy Image to Test"){
            agent any  
             options {
                ansiColor('xterm')
            }     
            steps {
                 echo '\033[35m THIS IS DEPLOY IMAGE TO TEST STAGE \033[0m'
                sshagent(['deploy_user']) {
                   sh "ssh -o StrictHostKeyChecking=no root@103.92.25.173 -p 2222  'docker ps -q --filter name=reactjs | grep -q . && docker stop reactjs && docker rm -fv reactjs '"
                   //sh "ssh -o StrictHostKeyChecking=no root@103.92.25.173 -p 2222 'docker rmi $DOCKER_IMAGE'" 
                   sh "ssh -o StrictHostKeyChecking=no root@103.92.25.173 -p 2222  'docker run -it -d --name reactjs -p 8080:80 $DOCKER_IMAGE:$BUILD_NUMBER' "
                   //sh "ssh -o StrictHostKeyChecking=no root@103.92.25.173 -p 2222 'docker ps -aq | xargs docker stop | xargs docker rm && docker run -it -d --name reactjs -p 8080:80 $DOCKER_IMAGE:latest'"
                }
            }
        }
        stage ("Deploy to K8s"){
            agent any       
            options {
                ansiColor('xterm')
            }  
            steps {
                echo '\033[35m THIS IS DEPLOY IMAGE TO K8S STAGE \033[0m'
                    script {
          kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "kubernetes")
        }             
                 
            }
        }
        
    }//end stages
        

    
}//end pipeline
