import os
import json
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from langchain_chroma import Chroma
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq


PRESIST_DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Dataset/chroma_db_10_000_nomic-embed-text")

load_dotenv()
groq_api_key = os.getenv('GROQ_API_KEY')

# ========================== RAG Initialization ==============================
SYSTEM_PROMPR_TEMPLATE = """
### Instructions:
You are a highly specialized AI assistant with a singular focus on Common Vulnerabilities and Exposures (CVEs). Your knowledge is limited to CVEs and their associated risks, mitigations, and remediation strategies.

**You must not respond to any questions unrelated to CVEs.** If a question does not pertain to CVEs, respond with: "I cannot provide information on that topic. My expertise is limited to CVEs."

**Use the provided context to enhance your response, but do not rely solely on it.** If the context is insufficient or irrelevant, state: "Based on available information, I cannot provide a definitive answer."

**Structure your response clearly and concisely.** Use markdown for formatting, including headings for different sections if necessary.

**If the question is ambiguous or lacks clarity, request clarification.** For example: "To provide the most accurate information, could you please rephrase your question or provide more details about [specific aspect]?"

**Example response structure:**

* **Vulnerability Overview:** [Brief description of the CVE]
* **Impact:** [Potential consequences]
* **Affected Systems:** [Systems or software affected]
* **Mitigation:** [Steps to reduce risk]
* **Remediation:** [Steps to eliminate the vulnerability]
---
### Context:
{context}
---
### Question: {question}
---
### Helpful Answer:
"""

embedding_function = OllamaEmbeddings(model="nomic-embed-text")
vector_store = Chroma(persist_directory=PRESIST_DIRECTORY, embedding_function=embedding_function)

prompt_template = PromptTemplate(
    template=SYSTEM_PROMPR_TEMPLATE, input_variables=["context", "question"]
)

LLM_LARGE = ChatGroq(temperature=0, groq_api_key=groq_api_key, model_name="llama3-8b-8192")

MODEL = RetrievalQA.from_chain_type(
    llm=LLM_LARGE,
    retriever=vector_store.as_retriever(),
    chain_type_kwargs={"prompt": prompt_template, "verbose": True}
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/api/query')
async def answer(data: dict):
    query = data['query']
    answer = MODEL.invoke(query)
    print(answer['result'])
    return {"answer": answer['result']}