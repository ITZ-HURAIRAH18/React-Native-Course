from django.urls import path
from .views import (
    SignupView, 
    LoginView, 
    ProfileDetailView, 
    SymptomAnalysisView, 
    ChatView, 
    AppointmentListCreateView, 
    AppointmentDetailView
)

urlpatterns = [
    # Auth
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', LoginView.as_view(), name='login'),
    
    # Profile
    path('profile/', ProfileDetailView.as_view(), name='profile'),
    
    # AI Endpoints
    path('analyze-symptoms/', SymptomAnalysisView.as_view(), name='analyze-symptoms'),
    path('chat/', ChatView.as_view(), name='chat'),
    
    # Appointments
    path('appointments/', AppointmentListCreateView.as_view(), name='appointments-list'),
    path('appointments/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
]
