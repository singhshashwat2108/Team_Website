import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
  if (!project) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        delay: 0.1,
        type: "spring" as const, // Changed this line
        stiffness: 100
      }
    },
    exit: { y: "100vh", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop" // Add this line
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Close when clicking on the backdrop
        >
          <motion.div
            key={project.title} // Add this line
            className="relative bg-gray-800 border border-white/20 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Section: Image */}
            <div className="relative w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Right Section: Text Details */}
            <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center text-white">
              <h3 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <span className="text-blue-300">{project.icon}</span>
                {project.title}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="border-white/30 text-white/80 bg-white/10">
                  {project.category}
                </Badge>
                <span className="text-white/70">{project.year}</span>
              </div>
              <p className="text-white/90 leading-relaxed">{project.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
