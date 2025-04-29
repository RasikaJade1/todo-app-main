pipeline {
    agent any
    tools {
        nodejs 'Node22' // Node.js 22.14.0
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/RasikaJade1/todo-app-main.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npm test -- --config=jest.config.js --coverage'
                junit 'test-results.xml'
            }
        }
        stage('Deploy') {
            when {
                branch 'main' // Deploy only on main branch
            }
            steps {
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                    bat '''
                        git config --global user.email "jenkins@ci.com"
                        git config --global user.name "Jenkins CI"
                        npm run deploy
                    '''
                }
            }
        }
    }
    post {
        always {
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'coverage/lcov-report',
                reportFiles: 'index.html',
                reportName: 'Jest Coverage Report'
            ])
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
