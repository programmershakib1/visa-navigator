import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const reviews = [
  {
    image: "https://i.ibb.co.com/3c88pQN/speaker-3.jpg",
    name: "John Doe",
    destination: "Paris, France",
    review:
      "My trip to Paris was absolutely unforgettable! From the Eiffel Tower sparkling at night to the charming streets filled with cafes, every moment felt like a dream. Visa Navigator made the entire process so easy and stress-free. Their attention to detail and support ensured I could focus entirely on enjoying my vacation. I highly recommend their services for anyone planning to travel!",
  },
  {
    image: "https://i.ibb.co.com/wBMp1Mt/speaker-1.jpg",
    name: "Jane Smith",
    destination: "Kyoto, Japan",
    review:
      "Exploring Kyoto was everything I hoped for and more. The serene temples, breathtaking gardens, and authentic cultural experiences were unforgettable. Visa Navigator guided me through the visa process effortlessly, leaving me free to immerse myself in the beauty of Japan. I’ll definitely use their service again for my next adventure.",
  },
  {
    image: "https://i.ibb.co.com/r4c6YGK/KHAN-ahmed-heart-2.jpg",
    name: "Ahmed Khan",
    destination: "Istanbul, Turkey",
    review:
      "Visiting Istanbul was an incredible experience. The rich history, delicious cuisine, and vibrant atmosphere were everything I had imagined. Visa Navigator made the entire trip possible with their professional and reliable service. From the visa application to helpful travel tips, they exceeded my expectations at every step.",
  },
  {
    image: "https://i.ibb.co.com/KDJvMHr/Screen2-B2020-07-032-B8-30-14-PM.jpg",
    name: "Emily White",
    destination: "Rome, Italy",
    review:
      "Rome is a city like no other. Walking through ancient ruins, enjoying authentic Italian cuisine, and marveling at the stunning art and architecture were highlights of my trip. Visa Navigator simplified everything for me, from the initial application to helpful updates along the way. I can’t wait to plan another trip with their help.",
  },
  {
    image: "https://i.ibb.co.com/qpZrPrn/download.jpg",
    name: "Carlos Martinez",
    destination: "Cancun, Mexico",
    review:
      "Cancun was the perfect destination for a relaxing and fun vacation. The pristine beaches, crystal-clear waters, and vibrant nightlife made every day special. Visa Navigator ensured that all the logistics were handled smoothly, allowing me to focus entirely on having a great time. I couldn’t have asked for a better experience!",
  },
  {
    image: "https://i.ibb.co.com/pWmStPC/download-1.jpg",
    name: "Fatima Ahmed",
    destination: "Dubai, UAE",
    review:
      "Dubai exceeded all my expectations. The city’s luxury, incredible skyline, and endless activities left me in awe. Visa Navigator was instrumental in making this trip happen by providing excellent guidance and support throughout the visa application process. Their service made everything easy and stress-free.",
  },
  {
    image: "https://i.ibb.co.com/095RQ9b/download-2.jpg",
    name: "Liam Johnson",
    destination: "Sydney, Australia",
    review:
      "Sydney’s iconic landmarks, like the Opera House and Harbour Bridge, were even more spectacular in person. Visa Navigator made this trip possible with their fantastic service. Their user-friendly platform and efficient communication ensured I had no worries and could simply enjoy my time in Australia.",
  },
  {
    image: "https://i.ibb.co.com/1dTBdZk/images.jpg",
    name: "Aisha Khan",
    destination: "Maldives",
    review:
      "The Maldives felt like a slice of paradise. From the overwater villas to the stunning coral reefs, every moment was magical. Visa Navigator handled every detail of the visa process seamlessly, giving me peace of mind and letting me fully embrace the beauty of the islands.",
  },
  {
    image: "https://i.ibb.co.com/86LwjLr/download-3.jpg",
    name: "David Brown",
    destination: "Cape Town, South Africa",
    review:
      "Cape Town offered an unforgettable mix of adventure and breathtaking scenery. From hiking Table Mountain to exploring vineyards, it was a dream destination. Visa Navigator’s service was top-notch, making sure I could focus on the trip without any hassle.",
  },
  {
    image: "https://i.ibb.co.com/VqGbb8Q/download-4.jpg",
    name: "Sophia Taylor",
    destination: "Santorini, Greece",
    review:
      "Santorini’s picturesque landscapes and magical sunsets were even more beautiful than I imagined. Visa Navigator made my dream trip a reality by providing an easy-to-follow process and excellent support throughout. I can’t wait to book my next trip with them.",
  },
  {
    image: "https://i.ibb.co.com/SJ37bZF/download-5.jpg",
    name: "Ethan Harris",
    destination: "Bangkok, Thailand",
    review:
      "Bangkok’s vibrant energy, bustling markets, and stunning temples made for an incredible experience. Visa Navigator took all the stress out of travel planning with their reliable service and quick assistance. I’m already planning my next adventure with their help.",
  },
  {
    image: "https://i.ibb.co.com/nndzQ3h/download-6.jpg",
    name: "Olivia Brown",
    destination: "Vienna, Austria",
    review:
      "Vienna’s rich cultural history and stunning architecture left me mesmerized. Visa Navigator provided an effortless way to handle the travel arrangements, giving me more time to explore and enjoy this beautiful city. I couldn’t be happier with their service.",
  },
  {
    image: "https://i.ibb.co.com/BzhBLwh/images-1.jpg",
    name: "Muhammad Ali",
    destination: "Marrakech, Morocco",
    review:
      "The vibrant colors and unique charm of Marrakech were unforgettable. From the bustling souks to the peaceful gardens, every moment was special. Visa Navigator played a vital role in making this trip seamless and enjoyable, and I couldn’t recommend them more.",
  },
  {
    image: "https://i.ibb.co.com/2jv77CJ/download-7.jpg",
    name: "Amelia Wilson",
    destination: "Prague, Czech Republic",
    review:
      "Prague’s fairytale charm and historic streets captivated me completely. Visa Navigator ensured that every part of my trip went smoothly. Their excellent service and helpful team made a world of difference in my travel experience.",
  },
  {
    image: "https://i.ibb.co.com/GTgc7sf/download-8.jpg",
    name: "Ryan Davis",
    destination: "Hawaii, USA",
    review:
      "Hawaii’s natural beauty, warm beaches, and stunning volcanoes created the perfect getaway. Visa Navigator made sure all the details were taken care of, so I could fully enjoy my trip without any stress. Highly recommended!",
  },
  {
    image: "https://i.ibb.co.com/FH5q75K/download-9.jpg",
    name: "Emily Johnson",
    destination: "Bali, Indonesia",
    review:
      "Bali was everything I had imagined and more. The serene beaches, lush greenery, and vibrant culture were a treat for the senses. Thanks to Visa Navigator, I didn’t have to worry about the visa process and could focus entirely on enjoying this magical destination.",
  },
  {
    image: "https://i.ibb.co.com/bRvsXbL/download-10.jpg",
    name: "Lucas Walker",
    destination: "Edinburgh, Scotland",
    review:
      "Edinburgh’s charm, history, and incredible views made it an unforgettable experience. Visa Navigator’s service was efficient and reliable, ensuring that my travel arrangements were flawless from start to finish.",
  },
  {
    image: "https://i.ibb.co.com/cYvg9vM/download-11.jpg",
    name: "Sophia Thompson",
    destination: "Reykjavik, Iceland",
    review:
      "The breathtaking beauty of Reykjavik and the Northern Lights left me speechless. Visa Navigator’s excellent support throughout the process made this trip truly stress-free. I couldn’t recommend them more!",
  },
  {
    image: "https://i.ibb.co.com/Fqqch1c/images-2.jpg",
    name: "Jack Robinson",
    destination: "Berlin, Germany",
    review:
      "Berlin’s unique mix of modernity and history was captivating. Visa Navigator ensured everything was handled professionally, giving me peace of mind throughout my travels. An amazing service!",
  },
  {
    image: "https://i.ibb.co.com/kmm2B8y/download-12.jpg",
    name: "Ella Carter",
    destination: "Vienna, Austria",
    review:
      "Exploring Vienna’s art, culture, and stunning streets was a joy. Visa Navigator’s hassle-free visa process made the experience all the more enjoyable. They’re my go-to service for all future travels.",
  },
];

const ReviewSection = () => {
  const { animationValue } = useContext(AuthContext);

  return (
    <div className="mx-5 md:mx-0 lg:mx-60 mt-20">
      <motion.h2
        {...animationValue}
        className="text-4xl font-bold text-center mb-5"
      >
        What Our Clients Say
      </motion.h2>
      <Swiper
        modules={[Autoplay, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx}>
            <motion.div {...animationValue} className="text-center p-10">
              <div className="flex justify-center">
                <img
                  className="w-20 rounded-full h-20"
                  src={review.image}
                  alt=""
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{review.name}</h3>
              <p className="text-lg mb-4 italic">
                Destination: {review.destination}
              </p>
              <p>{review.review}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSection;
