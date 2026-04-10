from rest_framework.routers import DefaultRouter
from .views import PerformanceViewSet, GoalViewSet, VideoViewSet

router = DefaultRouter()
router.register('performance', PerformanceViewSet)
router.register('goals', GoalViewSet)
router.register('videos', VideoViewSet)

urlpatterns = router.urls