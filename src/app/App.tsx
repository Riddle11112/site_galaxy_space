import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Rocket, Star, Check, X } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const slides = [
  {
    type: 'title',
    title: 'День космонавтики',
    subtitle: '12 апреля',
    description: 'Праздник, посвящённый первому полёту человека в космос',
    image: 'https://images.unsplash.com/photo-1614642240262-a452c2c11724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'content',
    title: 'Спутник-1',
    subtitle: '4 октября 1957 года',
    content: 'СССР запустил первый в мире искусственный спутник Земли',
    details: 'Это событие открыло космическую эру человечества',
    image: 'https://images.unsplash.com/photo-1770370419338-f9a813302baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'quiz',
    question: 'В каком году был запущен первый искусственный спутник Земли?',
    options: ['1955', '1957', '1959', '1961'],
    correctAnswer: 1,
  },
  {
    type: 'content',
    title: 'Белка и Стрелка',
    subtitle: '19 августа 1960 года',
    content: 'Первые живые существа, совершившие орбитальный полёт и благополучно вернувшиеся на Землю',
    details: 'Собаки провели в космосе более 25 часов',
    image: 'https://images.unsplash.com/photo-1585575141647-c2c436949374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'content',
    title: '12 апреля 1961 года',
    subtitle: 'Исторический день',
    content: 'Юрий Гагарин совершил первый в истории человечества полёт в космическое пространство на корабле «Восток-1»',
    details: 'Полёт продолжался 108 минут',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'quiz',
    question: 'В каком году Юрий Гагарин совершил первый полёт в космос?',
    options: ['1957', '1961', '1965', '1969'],
    correctAnswer: 1,
  },
  {
    type: 'content',
    title: 'Юрий Алексеевич Гагарин',
    subtitle: 'Первый космонавт',
    content: 'Легендарная фраза: «Поехали!»',
    details: 'После полёта Гагарин стал символом космической эры',
    image: 'https://images.unsplash.com/photo-1654122107122-0cbf2ed49aae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'quiz',
    question: 'Сколько минут длился полёт Гагарина?',
    options: ['88 минут', '108 минут', '128 минут', '148 минут'],
    correctAnswer: 1,
  },
  {
    type: 'content',
    title: 'Валентина Терешкова',
    subtitle: '16 июня 1963 года',
    content: 'Первая женщина-космонавт в истории человечества',
    details: 'Её позывной был "Чайка". Полёт длился почти трое суток',
    image: 'https://images.unsplash.com/photo-1626691041848-838a4f9dbbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'quiz',
    question: 'Кто была первой женщиной-космонавтом?',
    options: ['Светлана Савицкая', 'Салли Райд', 'Валентина Терешкова', 'Елена Кондакова'],
    correctAnswer: 2,
  },
  {
    type: 'content',
    title: 'Алексей Леонов',
    subtitle: '18 марта 1965 года',
    content: 'Совершил первый в истории выход человека в открытый космос',
    details: 'Выход в космос длился 12 минут 9 секунд',
    image: 'https://images.unsplash.com/photo-1654122107651-3f57c4e14dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'content',
    title: 'Луноход-1',
    subtitle: '17 ноября 1970 года',
    content: 'Первый в мире дистанционно управляемый самоходный аппарат на другом небесном теле',
    details: 'Проработал на Луне 11 месяцев вместо запланированных 3',
    image: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'quiz',
    question: 'Кто совершил первый выход в открытый космос?',
    options: ['Юрий Гагарин', 'Герман Титов', 'Алексей Леонов', 'Нейл Армстронг'],
    correctAnswer: 2,
  },
  {
    type: 'content',
    title: 'Станция «Салют»',
    subtitle: '1971-1986 годы',
    content: 'Первая в мире орбитальная станция, запущенная СССР',
    details: 'Программа включала 7 станций серии "Салют"',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'content',
    title: 'Станция «Мир»',
    subtitle: '1986-2001 годы',
    content: 'Легендарная советская, а затем российская орбитальная станция',
    details: 'Непрерывно работала 15 лет и стала символом эпохи',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'quiz',
    question: 'Как назывался первый советский луноход?',
    options: ['Луна-1', 'Луноход-1', 'Спутник-1', 'Восток-1'],
    correctAnswer: 1,
  },
  {
    type: 'content',
    title: 'Международная космическая станция',
    subtitle: 'МКС',
    content: 'Совместный проект России, США, Европы, Японии и Канады',
    details: 'Непрерывно обитаема с 2 ноября 2000 года',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'content',
    title: 'Космодром Байконур',
    subtitle: 'Первый космодром мира',
    content: 'Отсюда стартовал Юрий Гагарин и запускаются современные ракеты',
    details: 'Расположен в Казахстане, арендуется Россией',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'quiz',
    question: 'Как называется главный космодром России?',
    options: ['Плесецк', 'Капустин Яр', 'Байконур', 'Восточный'],
    correctAnswer: 2,
  },
  {
    type: 'content',
    title: 'Роскосмос сегодня',
    subtitle: 'Современная космонавтика',
    content: 'Запуски ракет «Союз» и «Протон», программа освоения Луны и Марса',
    details: 'Россия остаётся ведущей космической державой',
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'content',
    title: 'Программа освоения Луны',
    subtitle: 'Луна-25 и далее',
    content: 'Россия возобновила лунную программу, планирует создание базы на Луне',
    details: 'Будущее космонавтики - это Луна и Марс',
    image: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'quiz',
    question: 'Как назывался космический корабль Юрия Гагарина?',
    options: ['Восток-1', 'Союз-1', 'Восход-1', 'Протон-1'],
    correctAnswer: 0,
  },
  {
    type: 'content',
    title: 'Достижения СССР',
    subtitle: 'Космическая гонка',
    content: 'Первый искусственный спутник Земли, первый человек в космосе, первый выход в открытый космос, первая женщина-космонавт',
    details: 'СССР был абсолютным пионером космических исследований',
    image: 'https://images.unsplash.com/photo-1500185497267-d635f9c5e90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    type: 'quiz',
    question: 'Какая страна первой запустила человека в космос?',
    options: ['США', 'СССР', 'Китай', 'Франция'],
    correctAnswer: 1,
  },
  {
    type: 'final',
    title: 'Поехали!',
    subtitle: 'День космонавтики',
    content: 'Помним, гордимся, продолжаем покорять космос',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({});

  const slide = slides[currentSlide];
  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentSlide(currentSlide + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrev = () => {
    if (!isFirstSlide) {
      setCurrentSlide(currentSlide - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (!showResult && slide.type === 'quiz') {
      setSelectedAnswer(index);
      setShowResult(true);
      const isCorrect = index === slide.correctAnswer;
      setQuizResults({ ...quizResults, [currentSlide]: isCorrect });
    }
  };

  const correctAnswersCount = Object.values(quizResults).filter(Boolean).length;
  const totalQuizzes = slides.filter(s => s.type === 'quiz').length;

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex items-center justify-center p-8 md:p-16"
          >
            {slide.type === 'title' && (
              <div className="w-full h-full relative overflow-hidden rounded-3xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-center px-8 md:px-16">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <Rocket className="w-24 h-24 mb-8 text-blue-400 mx-auto" strokeWidth={1.5} />
                  </motion.div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-4xl md:text-5xl text-blue-300 mb-4"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-300 max-w-3xl"
                  >
                    {slide.description}
                  </motion.p>
                </div>
              </div>
            )}

            {slide.type === 'content' && (
              <div className="w-full h-full grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="space-y-6"
                >
                  <div>
                    <p className="text-blue-400 text-lg md:text-xl mb-2 uppercase tracking-wider">
                      {slide.subtitle}
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                      {slide.title}
                    </h2>
                  </div>
                  <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed">
                    {slide.content}
                  </p>
                  <div className="flex items-center gap-3 pt-4">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <p className="text-xl text-gray-400">
                      {slide.details}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="relative h-full min-h-[400px] rounded-2xl overflow-hidden"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 to-transparent" />
                </motion.div>
              </div>
            )}

            {slide.type === 'quiz' && (
              <div className="w-full max-w-4xl mx-auto space-y-8">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center gap-3 bg-blue-500/20 px-6 py-3 rounded-full mb-6">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl text-white font-semibold">Викторина</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 leading-tight">
                    {slide.question}
                  </h2>
                </motion.div>

                <div className="grid gap-4">
                  {slide.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === slide.correctAnswer;
                    const showCorrect = showResult && isCorrect;
                    const showIncorrect = showResult && isSelected && !isCorrect;

                    return (
                      <motion.button
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`
                          relative p-6 rounded-2xl text-left text-xl md:text-2xl font-medium
                          transition-all duration-300 transform hover:scale-[1.02]
                          ${showCorrect ? 'bg-green-500/30 border-2 border-green-400 text-white' : ''}
                          ${showIncorrect ? 'bg-red-500/30 border-2 border-red-400 text-white' : ''}
                          ${!showResult ? 'bg-white/10 border-2 border-white/20 text-white hover:bg-white/20 hover:border-white/40' : ''}
                          ${!showResult && isSelected ? 'bg-blue-500/30 border-blue-400' : ''}
                          disabled:cursor-not-allowed
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showCorrect && <Check className="w-8 h-8 text-green-400" />}
                          {showIncorrect && <X className="w-8 h-8 text-red-400" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {showResult && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`
                      text-center p-6 rounded-2xl text-xl
                      ${selectedAnswer === slide.correctAnswer
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                      }
                    `}
                  >
                    {selectedAnswer === slide.correctAnswer
                      ? '✓ Правильно! Отличная работа!'
                      : `✗ Неправильно. Правильный ответ: ${slide.options[slide.correctAnswer]}`
                    }
                  </motion.div>
                )}
              </div>
            )}

            {slide.type === 'final' && (
              <div className="w-full h-full relative overflow-hidden rounded-3xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                </div>
                <div className="relative h-full flex flex-col items-center justify-center text-center px-8 md:px-16">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <Rocket className="w-32 h-32 mb-8 text-blue-400 mx-auto" strokeWidth={1.5} />
                  </motion.div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-8xl md:text-9xl font-bold text-white mb-6"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-3xl md:text-4xl text-gray-300 mb-8"
                  >
                    {slide.content}
                  </motion.p>
                  {totalQuizzes > 0 && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="bg-blue-500/20 backdrop-blur-sm px-8 py-6 rounded-2xl border-2 border-blue-400/30"
                    >
                      <p className="text-2xl text-blue-300">
                        Результат викторины: <span className="font-bold text-white text-3xl">{correctAnswersCount}</span> из {totalQuizzes}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between px-8 md:px-16 pb-8">
          <button
            onClick={handlePrev}
            disabled={isFirstSlide}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-white transition-all backdrop-blur-sm border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-lg font-medium">Назад</span>
          </button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setSelectedAnswer(null);
                  setShowResult(false);
                }}
                className={`
                  w-3 h-3 rounded-full transition-all
                  ${index === currentSlide ? 'bg-blue-400 w-8' : 'bg-white/30 hover:bg-white/50'}
                `}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={isLastSlide}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-white transition-all"
          >
            <span className="text-lg font-medium">Вперёд</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}