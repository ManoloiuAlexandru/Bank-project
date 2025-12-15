# Dockerfile-tests
FROM python:3.12-slim-bookworm

# Set working directory
WORKDIR /app

# Install system dependencies including Java 17 (compatible with SonarScanner 4.8)
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    git \
    openjdk-17-jre-headless \
    && rm -rf /var/lib/apt/lists/*

# Set JAVA_HOME for SonarScanner
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt
RUN pip install pytest pytest-cov

# Install Sonar Scanner CLI
RUN curl -o /tmp/sonar-scanner-cli.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-linux.zip \
    && unzip /tmp/sonar-scanner-cli.zip -d /opt/ \
    && mv /opt/sonar-scanner-4.8.0.2856-linux /opt/sonar-scanner \
    && rm /tmp/sonar-scanner-cli.zip

# Add sonar-scanner to PATH
ENV PATH="/opt/sonar-scanner/bin:${PATH}"
ENV PYTHONPATH="/app"

# Copy project code
COPY . .

# Optional: if you want to use a script to run tests + sonar
# Make entrypoint script executable
# RUN chmod +x run_tests_and_sonar.sh
# ENTRYPOINT ["./run_tests_and_sonar.sh"]
