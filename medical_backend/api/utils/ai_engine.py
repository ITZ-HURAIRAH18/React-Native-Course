import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

def classify_symptoms(symptoms_text):
    """Classifies user symptoms and returns the recommended doctor type."""
    if not GEMINI_API_KEY:
        return {"doctor": "General Physician", "reason": "AI Key not configured."}

    model = genai.GenerativeModel("gemini-1.5-flash") # Use flash for cost efficiency
    
    prompt = f"""
    User symptoms: "{symptoms_text}"
    
    Classify the best matching medical specialist from this list:
    1. Dentist
    2. Dermatologist
    3. Orthopedic
    4. General Physician
    5. Cardiologist
    6. Eye Specialist (Ophthalmologist)
    7. Pediatrician
    
    Return the response as a JSON string with keys: 'doctor' and 'reason'.
    Doctor should be one of the names above.
    Reason should be a short explanation (1 sentence).
    """

    try:
        response = model.generate_content(prompt)
        text = response.text
        # In a real app, parse JSON safely. For now, returning as is or cleaning.
        # Simple cleanup if AI returns extras
        if '```json' in text:
            text = text.split('```json')[1].split('```')[0].strip()
        elif '```' in text:
             text = text.split('```')[1].strip()
             
        import json
        return json.loads(text)
    except Exception as e:
        print(f"AI classification error: {str(e)}")
        return {"doctor": "General Physician", "reason": "Failed to analyze symptoms."}

def chatbot_response(user_input, history=[]):
    """Provides a medical chatbot response based on user input."""
    if not GEMINI_API_KEY:
        return "Chatbot is currently offline."

    model = genai.GenerativeModel("gemini-1.5-flash")
    chat = model.start_chat(history=history)
    
    system_instruction = "You are a helpful medical triage assistant. You help users understand their symptoms and direct them to the right specialist. Be polite and professional."
    
    try:
        response = chat.send_message(f"System instruction: {system_instruction}\nUser: {user_input}")
        return response.text
    except Exception as e:
        print(f"Chat error: {str(e)}")
        return "I apologize, but I'm having trouble responding right now."
