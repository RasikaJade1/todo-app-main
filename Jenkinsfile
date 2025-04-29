// pipeline {
//     agent any
//     tools {
//         nodejs 'Node16'
//     }
//     environment {
//         MONGO_URI = 'mongodb://127.0.0.1:27017/testdb'
//     }
//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Sanskruti2209/todo-app.git'
//             }
//         }
//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm install'
//             }
//         }
//         stage('Run Tests') {
//             steps {
//                 // Clean test database
//                 bat 'mongo testdb --eval "db.dropDatabase()" || exit 0'
//                 // Run tests with coverage threshold
//                 bat 'npm test -- --coverageThreshold="{\\"global\\":{\\"statements\\":70}}"'
//                 // Publish JUnit results immediately
//                 junit 'test-results.xml'
//             }
//         }
//         stage('Build Docker Image') {
//             when {
//                 expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
//             }
//             steps {
//                 bat 'docker-compose build'
//             }
//         }
//         stage('Deploy') {
//             when {
//                 expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
//             }
//             steps {
//                 bat 'docker-compose up -d'
//             }
//         }
//     }
//     post {
//         always {
//             // Publish HTML coverage report
//             publishHTML(target: [
//                 allowMissing: true,
//                 alwaysLinkToLastBuild: true,
//                 keepAll: true,
//                 reportDir: 'coverage/lcov-report',
//                 reportFiles: 'index.html',
//                 reportName: 'Jest Coverage Report'
//             ])
//             // Archive coverage artifacts
//             archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
//             // Clean up Docker containers
//             bat 'docker-compose down || exit 0'
//         }
//         success {
//             echo 'Pipeline completed successfully!'
//         }
//         failure {
//             echo 'Pipeline failed!'
//         }
//     }
// }
// pipeline {
//     agent any
//     tools {
//         nodejs 'Node16'
//     }
//     environment {
//         MONGO_URI = 'mongodb://127.0.0.1:27017/testdb'
//     }
//     stages {
//         stage('Checkout') {
//             steps {
//                 git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Sanskruti2209/todo-app.git'
//             }
//         }
//         stage('Install Dependencies') {
//             steps {
//                 bat 'npm install'
//             }
//         }
//         stage('Run Tests') {
//             steps {
//                 // Ensure MongoDB is running (optional, skips if already running)
//                 bat 'start /B mongod --dbpath C:\\data\\db || exit 0'
//                 // Clean test database
//                 bat 'mongo %MONGO_URI% --eval "db.dropDatabase()" || exit 0'
//                 // Run tests with coverage
//                 bat 'npm test -- --coverage --testResultsProcessor=jest-junit'
//                 // Publish JUnit results
//                 junit 'test-results.xml'
//             }
//         }
//     }
//     post {
//         always {
//             // Publish HTML coverage report
//             publishHTML(target: [
//                 allowMissing: true,
//                 alwaysLinkToLastBuild: true,
//                 keepAll: true,
//                 reportDir: 'coverage/lcov-report',
//                 reportFiles: 'index.html',
//                 reportName: 'Jest Coverage Report'
//             ])
//             // Archive coverage artifacts
//             archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
//         }
//         success {
//             echo 'Pipeline completed successfully!'
//         }
//         failure {
//             echo 'Pipeline failed!'
//         }
//     }
// }

pipeline {
    agent any
    tools {
        nodejs 'Node16'
    }
    environment {
        MONGO_URI = 'mongodb://127.0.0.1:27017/testdb'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/Sanskruti2209/todo-app.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                // Ensure MongoDB is running
                bat 'start /B mongod --dbpath C:\\data\\db || exit 0'
                // Run tests with explicit Jest config
                bat 'npm test -- --config=jest.config.js --coverage'
                // Publish JUnit results
                junit 'test-results.xml'
            }
        }
    }
    post {
        always {
            // Publish HTML coverage report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'coverage/lcov-report',
                reportFiles: 'index.html',
                reportName: 'Jest Coverage Report'
            ])
            // Archive coverage artifacts
            archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}