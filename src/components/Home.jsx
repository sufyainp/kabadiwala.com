import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Recycle, 
  Users, 
  Shield, 
  Clock,
  Star,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo,
  CheckCircle
} from "phosphor-react";

const Home = () => {
  // Animation variants for reusability
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Configuration data
  const features = [
    {
      icon: Shield,
      title: "Verified Collectors",
      description: "All our collectors are verified and trusted professionals"
    },
    {
      icon: Clock,
      title: "Quick Pickup",
      description: "Schedule convenient pickup times that work for you"
    },
    {
      icon: Recycle,
      title: "Eco-Friendly",
      description: "Contribute to a sustainable and greener environment"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of users making a positive impact"
    }
  ];

  const howItWorksSteps = [
    {
      step: "1",
      title: "List Your Scrap",
      description: "Upload details and pictures of items you want to sell or recycle",
      icon: "📝"
    },
    {
      step: "2", 
      title: "Get Best Offers",
      description: "Compare offers from verified collectors and choose the best one",
      icon: "💰"
    },
    {
      step: "3",
      title: "Hassle-Free Pickup",
      description: "Schedule convenient pickup and get paid on the spot",
      icon: "🚛"
    }
  ];

  const stats = [
    { label: "Items Recycled", value: "25K+", icon: "♻️" },
    { label: "Happy Customers", value: "10K+", icon: "😊" },
    { label: "KG Waste Processed", value: "120K+", icon: "⚖️" },
    { label: "Verified Collectors", value: "500+", icon: "✅" }
  ];

  const testimonials = [
    {
      name: "Ravi Kumar",
      role: "Homeowner",
      feedback: "Super easy process! Got rid of my old electronics hassle-free and made some money too.",
      rating: 5
    },
    {
      name: "Neha Malhotra", 
      role: "Business Owner",
      feedback: "Love how transparent the pricing is. Perfect for our office waste management needs.",
      rating: 5
    },
    {
      name: "Imran Patel",
      role: "Student",
      feedback: "Scheduled a pickup through the app and got paid instantly. Amazing service!",
      rating: 5
    }
  ];

  const quickLinks = [
    { label: "Scrap Rates", href: "/rates" },
    { label: "E-Waste Recycling", href: "/e-waste" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Blog", href: "/blog" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" }
  ];

  const socialLinks = [
    { icon: FacebookLogo, href: "https://facebook.com/kabadiwala", label: "Facebook" },
    { icon: InstagramLogo, href: "https://instagram.com/kabadiwala", label: "Instagram" },
    { icon: LinkedinLogo, href: "https://linkedin.com/company/kabadiwala", label: "LinkedIn" },
    { icon: TwitterLogo, href: "https://twitter.com/kabadiwala", label: "Twitter" }
  ];

  return (
    <main className="min-h-screen w-full overflow-hidden font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-100 to-green-200">
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <motion.h1 
              className="mb-6 text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-emerald-600 via-green-700 to-green-800 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Welcome to
              <br />
              <span className="text-green-800">Kabadiwala.com</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              <p className="text-lg md:text-xl lg:text-2xl text-gray-800 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
                Transform your waste into wealth. Join India's largest digital scrap marketplace connecting you with verified collectors.
              </p>
              
              <p className="text-base md:text-lg text-gray-700 bg-green-50/80 backdrop-blur-sm p-4 rounded-xl shadow-md max-w-2xl mx-auto">
                Empowering communities through sustainable recycling solutions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/shop" className="group">
                <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-2">
                  <span>Start Shopping</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link to="/register" className="group">
                <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 flex items-center space-x-2">
                  <span>Sell Your Scrap</span>
                  <Recycle size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-600 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Why Choose Kabadiwala.com?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We're not just a platform — we're a movement towards sustainable living.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-green-50 to-white border border-green-100"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-800 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Simple steps to turn your waste into wealth
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="initial"  
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  
                  <div className="text-4xl mb-4 text-center">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-green-700 mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-green-100 max-w-2xl mx-auto text-lg">
              Together, we're making a difference for our planet
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-green-100 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Real stories from our satisfied customers
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic text-center mb-6 leading-relaxed">
                  "{testimonial.feedback}"
                </p>
                
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-emerald-100 mb-8 text-lg">
              Join thousands of users making the planet greener, one scrap at a time!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="group">
                <button className="bg-white text-emerald-700 hover:bg-gray-100 font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                  <span>Get Started Today</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <Link to="/contact" className="group">
                <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  Contact Us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-green-400 mb-4">
                Kabadiwala.com
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                India's leading digital scrap marketplace connecting buyers and sellers for a sustainable future.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors duration-300"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-green-400">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                    >
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-green-400">
                Legal
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                    >
                      <CheckCircle size={16} className="text-green-500" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-green-400">
                Get in Touch
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 mt-1">
                    <svg fill="currentColor" viewBox="0 0 20 20" className="text-green-500">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      123 Green Street, Eco City<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5">
                    <svg fill="currentColor" viewBox="0 0 20 20" className="text-green-500">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <p className="text-gray-300">+91 9876543210</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5">
                    <svg fill="currentColor" viewBox="0 0 20 20" className="text-green-500">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <p className="text-gray-300">hello@kabadiwala.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 Kabadiwala.com. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm mt-2 md:mt-0">
                Made with ❤️ by Sufyain Posharkar
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
