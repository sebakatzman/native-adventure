from django.urls import path, include
from rest_framework import routers
from api.views import CardViewSet,  SectionViewSet,DetailSectionViewSet, ItemViewSet,ExcursionViewSet, ImagesExcursionViewSet,SectionImageViewSet, SectionImageDetailsViewSet,ContactViewSet, ComentarioViewSet,ReservationViewSet, MedicalFormViewSet

router = routers.DefaultRouter()  # Asegúrate de crear una instancia de DefaultRouter
router.register(r'cards', CardViewSet)
router.register(r'sections', SectionViewSet)
router.register(r'detail-sections', DetailSectionViewSet)
router.register(r'items', ItemViewSet)
router.register(r'excursions', ExcursionViewSet)
router.register(r'images-excursions', ImagesExcursionViewSet)
router.register(r'section-images', SectionImageViewSet)
router.register(r'section-image-details', SectionImageDetailsViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'comentarios', ComentarioViewSet)
router.register(r'reservations', ReservationViewSet)
router.register(r'medical-forms', MedicalFormViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
