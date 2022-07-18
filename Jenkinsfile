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
            steps {
                echo "Build stage"
            }
        }
        
    }
        

    
}
