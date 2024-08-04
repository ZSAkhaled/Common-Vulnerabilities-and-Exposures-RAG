# Common Vulnerabilities and Exposures (CVE) RAG

This project is a specialized AI assistant focused on providing detailed information about Common Vulnerabilities and Exposures (CVEs). It uses a Retrieval-Augmented Generation (RAG) architecture to answer queries related to CVEs, leveraging a combination of FastAPI for the backend and Next.js for the frontend.

## Project Structure

```
backend/
  ├── Dataset/
  ├── Preprocessing/
  ├── main.py
  ├── requirements.txt
frontend/
```

## Features

- **Focused Expertise**: The AI assistant specializes in CVEs, providing insights into vulnerabilities, impacts, affected systems, mitigation, and remediation strategies.
- **Retrieval-Augmented Generation**: Utilizes a combination of pre-trained language models and a retrieval mechanism to generate accurate and contextually relevant responses.
- **FastAPI Backend**: Handles incoming queries and manages the interaction with the AI model.
- **Next.js Frontend**: Provides a user interface for interacting with the AI assistant.

## Setup Instructions

### Backend

1. **Install Dependencies**: 
   Ensure you have Python installed, then install the required packages using pip:
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**:
   - Create a `.env` file in the `backend` directory.
   - Add your Groq API key:
     ```
     GROQ_API_KEY=your_groq_api_key_here
     ```

3. **Run the Server**:
   Navigate to the `backend` directory and run:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. **Install Dependencies**:
   Navigate to the `frontend` directory and install the required packages:
   ```bash
   npm install
   ```

2. **Run the Development Server**:
   Start the Next.js development server:
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   Open your web browser and go to `http://localhost:3000` to interact with the CVE Query Assistant.

## Usage

- Send POST requests to `/api/query` endpoint with a JSON body containing the `query` field.
- The server will return a structured response containing relevant information about the queried CVE.

## Important Notes

- The assistant's knowledge is limited strictly to CVEs. It will not answer questions unrelated to this topic.
- The response is structured in a clear, concise manner using markdown for formatting.

## Acknowledgments

- Built with FastAPI and Next.js
- Uses LangChain, LLaMA3.1, and Groq for advanced AI capabilities