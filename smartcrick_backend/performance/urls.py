from rest_framework.routers import DefaultRouter

from .views import GoalViewSet, PerformanceViewSet, VideoViewSet

router = DefaultRouter()
router.register("performance", PerformanceViewSet, basename="performance")
router.register("goals", GoalViewSet, basename="goals")
router.register("videos", VideoViewSet, basename="videos")

urlpatterns = router.urls
