import type { DestinationGuideContent } from '@/types/destination.types';

export const demoDestinationDetails: DestinationGuideContent[] = [
  {
    destinationId: 'bogota',
    safetyTips: [
      'En esta ficha de ejemplo, planea tus recorridos con anticipación y mantén tus pertenencias a la vista.',
      'Comparte el itinerario de demostración con tu grupo antes de salir.',
    ],
    transportTips: [
      'Este ejemplo sugiere comparar opciones de transporte antes del recorrido.',
      'Consulta directamente horarios y rutas vigentes con operadores oficiales.',
    ],
    healthTips: [
      'Como recomendación general de bienestar, lleva agua y descansa durante caminatas.',
      'Consulta fuentes de salud oficiales antes de viajar.',
    ],
    travelerRecommendations: [
      'Reserva tiempo para explorar con calma y adapta el plan a tus intereses.',
      'Guarda copias de documentos importantes en un lugar seguro.',
    ],
    pointsOfInterest: ['La Candelaria', 'Museo del Oro', 'Jardín Botánico (ejemplos)'],
    emergencyContacts: [
      { label: 'Contacto de emergencia de demostración', number: '000-000-0000' },
      { label: 'Asistencia consular de demostración', number: '000-000-0000' },
    ],
    isDemonstrationData: true,
  },
  {
    destinationId: 'ciudad-de-mexico',
    safetyTips: [
      'Este consejo demostrativo recomienda acordar un punto de encuentro con tus acompañantes.',
      'Mantén tus pertenencias contigo en espacios concurridos.',
    ],
    transportTips: [
      'Compara alternativas de movilidad antes de salir; esta ficha no muestra servicios reales.',
      'Verifica rutas y horarios actualizados con los canales oficiales de cada operador.',
    ],
    healthTips: [
      'Planea pausas para descansar e hidratarte durante las visitas.',
      'Revisa recomendaciones oficiales de salud adecuadas para tus necesidades.',
    ],
    travelerRecommendations: [
      'Considera reservar con anticipación las actividades que te interesen.',
      'Anota la dirección de tu alojamiento antes de comenzar un recorrido.',
    ],
    pointsOfInterest: ['Centro Histórico', 'Bosque de Chapultepec', 'Museo Nacional de Antropología (ejemplos)'],
    emergencyContacts: [
      { label: 'Contacto de emergencia de demostración', number: '000-000-0000' },
      { label: 'Asistencia consular de demostración', number: '000-000-0000' },
    ],
    isDemonstrationData: true,
  },
  {
    destinationId: 'marrakech',
    safetyTips: [
      'En este ejemplo, acuerda de antemano un punto visible para reencontrarte con tu grupo.',
      'Guarda tus objetos personales de manera segura mientras recorres la ciudad.',
    ],
    transportTips: [
      'Pregunta por las condiciones del trayecto antes de elegir una opción de movilidad.',
      'Confirma los servicios, las tarifas y los horarios con fuentes locales oficiales.',
    ],
    healthTips: [
      'Lleva agua y considera pausas a la sombra durante recorridos al aire libre.',
      'Consulta orientación sanitaria oficial para tus fechas y necesidades de viaje.',
    ],
    travelerRecommendations: [
      'Reserva espacio para descubrir los mercados y jardines a tu propio ritmo.',
      'Respeta las costumbres y normas locales durante tus visitas.',
    ],
    pointsOfInterest: ['Medina', 'Jemaa el-Fnaa', 'Jardín Majorelle (ejemplos)'],
    emergencyContacts: [
      { label: 'Contacto de emergencia de demostración', number: '000-000-0000' },
      { label: 'Asistencia consular de demostración', number: '000-000-0000' },
    ],
    isDemonstrationData: true,
  },
  {
    destinationId: 'paris',
    safetyTips: [
      'Esta ficha ficticia sugiere definir un punto de encuentro si viajas en grupo.',
      'Mantén a resguardo tus pertenencias durante las visitas.',
    ],
    transportTips: [
      'Planifica cómo llegar a cada visita y verifica cambios de servicio con los operadores.',
      'Las rutas y horarios de esta demostración no representan información vigente.',
    ],
    healthTips: [
      'Considera hacer pausas entre las actividades para mantener un ritmo cómodo.',
      'Consulta recomendaciones oficiales de salud antes de iniciar tu viaje.',
    ],
    travelerRecommendations: [
      'Consulta los horarios de los lugares culturales en sus páginas oficiales.',
      'Lleva contigo la dirección de tu alojamiento y un plan de regreso.',
    ],
    pointsOfInterest: ['Museo del Louvre', 'Jardín de las Tullerías', 'Île de la Cité (ejemplos)'],
    emergencyContacts: [
      { label: 'Contacto de emergencia de demostración', number: '000-000-0000' },
      { label: 'Asistencia consular de demostración', number: '000-000-0000' },
    ],
    isDemonstrationData: true,
  },
  {
    destinationId: 'tokyo',
    safetyTips: [
      'Este consejo ilustrativo recomienda acordar cómo reunirse si el grupo se separa.',
      'Ten a mano la dirección de destino escrita para consultarla durante el recorrido.',
    ],
    transportTips: [
      'Revisa las indicaciones disponibles con el operador antes de iniciar un trayecto.',
      'Esta demostración no muestra mapas, horarios ni servicios de transporte reales.',
    ],
    healthTips: [
      'Programa descansos y lleva contigo los artículos personales que necesites.',
      'Consulta fuentes oficiales para conocer recomendaciones sanitarias actualizadas.',
    ],
    travelerRecommendations: [
      'Alterna los lugares concurridos con momentos de descanso en tu itinerario.',
      'Verifica normas locales y horarios de visita antes de planificar una actividad.',
    ],
    pointsOfInterest: ['Parque Ueno', 'Templo Sensō-ji', 'Jardín Nacional Shinjuku Gyoen (ejemplos)'],
    emergencyContacts: [
      { label: 'Contacto de emergencia de demostración', number: '000-000-0000' },
      { label: 'Asistencia consular de demostración', number: '000-000-0000' },
    ],
    isDemonstrationData: true,
  },
  {
    destinationId: 'sydney',
    safetyTips: [
      'Como recordatorio de demostración, informa a tu grupo de los cambios en el itinerario.',
      'Sigue las indicaciones publicadas por las autoridades y los lugares que visites.',
    ],
    transportTips: [
      'Planifica los traslados antes de salir y comprueba la información con sus operadores.',
      'Los servicios descritos aquí no corresponden a horarios ni rutas reales.',
    ],
    healthTips: [
      'Incluye pausas, agua y protección adecuada para actividades al aire libre.',
      'Consulta recomendaciones oficiales de salud y seguridad para las fechas del viaje.',
    ],
    travelerRecommendations: [
      'Reserva tiempo para disfrutar del puerto y sus alrededores con tranquilidad.',
      'Consulta las normas locales antes de visitar playas y espacios naturales.',
    ],
    pointsOfInterest: ['Puerto de Sídney', 'Royal Botanic Garden', 'Bondi Beach (ejemplos)'],
    emergencyContacts: [
      { label: 'Contacto de emergencia de demostración', number: '000-000-0000' },
      { label: 'Asistencia consular de demostración', number: '000-000-0000' },
    ],
    isDemonstrationData: true,
  },
];
