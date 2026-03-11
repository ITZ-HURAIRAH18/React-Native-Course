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

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Auth
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Profile
    path('profile/', ProfileDetailView.as_view(), name='profile'),
    
    # AI Endpoints
    path('analyze-symptoms/', SymptomAnalysisView.as_view(), name='analyze-symptoms'),
    path('chat/', ChatView.as_view(), name='chat'),
    
    # Appointments
    path('appointments/', AppointmentListCreateView.as_view(), name='appointments-list'),
    path('appointments/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
]
