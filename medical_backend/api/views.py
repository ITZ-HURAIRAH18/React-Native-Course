from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile, Appointment, ChatHistory
from .serializers import UserSerializer, ProfileSerializer, AppointmentSerializer, ChatHistorySerializer
from .utils.ai_engine import classify_symptoms, chatbot_response

# Authentication Views
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        from django.contrib.auth import authenticate
        user = authenticate(username=username, password=password)
        
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Profile View
class ProfileDetailView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return Profile.objects.get(user=self.request.user)

# AI Symptom Classification View
class SymptomAnalysisView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        symptoms = request.data.get('symptoms')
        if not symptoms:
             return Response({'error': 'No symptoms provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        result = classify_symptoms(symptoms)
        # Store analysis if needed (optional)
        return Response(result)

# AI Chatbot View
class ChatView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        message = request.data.get('message')
        if not message:
            return Response({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Log user message
        ChatHistory.objects.create(user=request.user, message=message, is_ai=False)
        
        # Get history for context (last 5 messages)
        history_objs = ChatHistory.objects.filter(user=request.user).order_by('-timestamp')[:5]
        history = [{"role": "user" if not h.is_ai else "model", "parts": [h.message]} for h in reversed(history_objs)]
        
        ai_reply = chatbot_response(message, history=history)
        
        # Log AI message
        ChatHistory.objects.create(user=request.user, message=ai_reply, is_ai=True)
        
        return Response({'reply': ai_reply})

# Appointment Views
class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)

class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)
