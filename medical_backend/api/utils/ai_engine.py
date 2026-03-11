import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# Preferred model (Updated to 2.0-flash)
PREFERRED_MODEL = "gemini-2.0-flash"

def classify_symptoms(symptoms_text):
    """Classifies user symptoms and returns the recommended doctor type."""
    if not GEMINI_API_KEY:
        return {"doctor": "General Physician", "reason": "AI Key not configured."}

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
    
    Return the response ONLY as a JSON string with keys: 'doctor' and 'reason'.
    Doctor should be one of the names above.
    Reason should be a short explanation (1 sentence).
    """

    # Try models in order of preference
    models_to_try = [PREFERRED_MODEL, "gemini-1.5-flash", "gemini-pro"]
    text = ""
    
    for model_name in models_to_try:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(prompt)
            text = response.text
            if text: break
        except Exception as e:
            print(f"Model {model_name} failed: {str(e)}")
            continue

    if not text:
        return {"doctor": "General Physician", "reason": "AI services are currently unavailable."}

    try:
        # Cleanup JSON formatting
        if '```json' in text:
            text = text.split('```json')[1].split('```')[0].strip()
        elif '```' in text:
            text = text.split('```')[1].strip()
             
        import json
        return json.loads(text)
    except Exception as e:
        print(f"AI classification parsing error: {str(e)}")
        return {"doctor": "General Physician", "reason": "Failed to analyze symptoms correctly."}

def chatbot_response(user_input, history=[]):
    """Provides a medical chatbot response based on user input."""
    if not GEMINI_API_KEY:
        return "Chatbot is currently offline."

    system_instruction = "You are a helpful medical triage assistant. You help users understand their symptoms and direct them to the right specialist. Be polite and professional."
    full_input = f"System instruction: {system_instruction}\nUser: {user_input}"

    models_to_try = [PREFERRED_MODEL, "gemini-1.5-flash", "gemini-pro"]
    
    for model_name in models_to_try:
        try:
            model = genai.GenerativeModel(model_name)
            chat = model.start_chat(history=history)
            response = chat.send_message(full_input)
            return response.text
        except Exception as e:
            print(f"Chat model {model_name} failed: {str(e)}")
            continue

    return "I apologize, but I'm having trouble responding right now. Please try again later."
