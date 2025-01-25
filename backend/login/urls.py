from django.urls import path
from .views import LoginView, SignUpView, SignOutView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signout/', SignOutView.as_view(), name='signout'),
]