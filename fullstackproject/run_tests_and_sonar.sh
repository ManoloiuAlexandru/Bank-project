#!/bin/bash
set -e

sleep 1

echo "Running tests..."
pytest --cov=backend --cov-report=xml --maxfail=1 --disable-warnings

if [ ! -f coverage.xml ]; then
          echo "Error: coverage.xml not found!"
            exit 1
fi

echo "Running SonarQube analysis..."
sonar-scanner \
          -Dsonar.projectKey=snekkbank \
            -Dsonar.sources=. \
              -Dsonar.host.url="http://sonarqube:9000" \
                -Dsonar.login="$SONAR_TOKEN" \
                  -Dsonar.python.coverage.reportPaths=coverage.xml

echo "Tests and Sonar analysis complete!"