"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";

interface ShareCardProps {
  days: number;
}

export default function ShareCard({ days }: ShareCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!shareCardRef.current) return null;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), "image/png");
      });
      
      setIsGenerating(false);
      return blob;
    } catch (error) {
      console.error("Error generating image:", error);
      setIsGenerating(false);
      return null;
    }
  };

  const handleShare = async (platform: string) => {
    const blob = await generateImage();
    if (!blob) return;

    const file = new File([blob], "ramadhan-countdown.png", { type: "image/png" });
    const url = URL.createObjectURL(blob);

    if (platform === "download") {
      const link = document.createElement("a");
      link.href = url;
      link.download = "ramadhan-countdown.png";
      link.click();
      URL.revokeObjectURL(url);
    } else if (platform === "whatsapp") {
      const text = `Menuju Ramadhan 1447H - Tinggal ${days} hari lagi! 🌙✨`;
      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
            title: "Countdown Ramadhan 1447H",
            text: text,
          });
        } catch (err) {
          // Fallback to WhatsApp Web
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
        }
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
      }
    } else if (platform === "copy") {
      const currentUrl = window.location.href;
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert("Link berhasil disalin!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    } else if (platform === "instagram" || platform === "twitter") {
      // Download image for manual sharing
      const link = document.createElement("a");
      link.href = url;
      link.download = "ramadhan-countdown.png";
      link.click();
      URL.revokeObjectURL(url);
      alert("Gambar telah diunduh. Silakan bagikan secara manual ke " + (platform === "instagram" ? "Instagram" : "Twitter"));
    }
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        onClick={() => setShowModal(true)}
        className="w-full bg-white border-2 border-primary-green/20 text-primary-green py-4 rounded-2xl font-semibold text-base md:text-lg shadow-md hover:shadow-lg hover:border-primary-green/40 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Bagikan Countdown
      </motion.button>

      {/* Share Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl md:rounded-3xl w-full max-w-sm md:max-w-md shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-green/90 to-primary-green p-4 md:p-6 text-white">
              <div className="flex items-center justify-between mb-1 md:mb-2">
                <h3 className="text-lg md:text-2xl font-bold">Bagikan Countdown</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 md:p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-white/90 text-xs md:text-sm">Ajak teman dan keluarga untuk menyambut Ramadhan bersama</p>
            </div>

            {/* Preview Card */}
            <div className="p-3 md:p-6 bg-gradient-to-br from-gray-50 to-white">
              <div ref={shareCardRef} className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 md:p-8 rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl border border-gray-200 overflow-hidden">
                {/* Grid background pattern */}
                <div className="absolute inset-0 opacity-[0.08]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(to right, #019147 0.5px, transparent 0.5px),
                      linear-gradient(to bottom, #019147 0.5px, transparent 0.5px)
                    `,
                    backgroundSize: '20px 20px'
                  }} />
                </div>

                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-orange/5 rounded-full blur-3xl" />
                
                {/* Hanging Lanterns - Left */}
                <div className="absolute top-0 left-4 md:left-8 opacity-20">
                  <svg className="w-8 h-12 md:w-12 md:h-16" viewBox="0 0 100 150" fill="none">
                    {/* Chain */}
                    <line x1="50" y1="0" x2="50" y2="30" stroke="#019147" strokeWidth="2" strokeDasharray="3,3"/>
                    {/* Lantern body */}
                    <path d="M30 40 Q30 35 35 35 L65 35 Q70 35 70 40 L70 90 Q70 100 60 105 L40 105 Q30 100 30 90 Z" fill="url(#lanternGradient)" stroke="#019147" strokeWidth="2"/>
                    {/* Top dome */}
                    <ellipse cx="50" cy="35" rx="20" ry="8" fill="#FF9822" opacity="0.8"/>
                    {/* Bottom dome */}
                    <path d="M35 105 Q50 115 65 105" fill="#FF9822" opacity="0.8"/>
                    {/* Light glow */}
                    <ellipse cx="50" cy="70" rx="15" ry="25" fill="#FFD700" opacity="0.4"/>
                    {/* Decorative lines */}
                    <line x1="35" y1="50" x2="65" y2="50" stroke="#019147" strokeWidth="1" opacity="0.5"/>
                    <line x1="35" y1="70" x2="65" y2="70" stroke="#019147" strokeWidth="1" opacity="0.5"/>
                    <line x1="35" y1="90" x2="65" y2="90" stroke="#019147" strokeWidth="1" opacity="0.5"/>
                    <defs>
                      <linearGradient id="lanternGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FF9822" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#019147" stopOpacity="0.2"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Hanging Lanterns - Right */}
                <div className="absolute top-0 right-4 md:right-8 opacity-20">
                  <svg className="w-8 h-12 md:w-12 md:h-16" viewBox="0 0 100 150" fill="none">
                    {/* Chain */}
                    <line x1="50" y1="0" x2="50" y2="25" stroke="#019147" strokeWidth="2" strokeDasharray="3,3"/>
                    {/* Lantern body */}
                    <path d="M30 35 Q30 30 35 30 L65 30 Q70 30 70 35 L70 85 Q70 95 60 100 L40 100 Q30 95 30 85 Z" fill="url(#lanternGradient2)" stroke="#019147" strokeWidth="2"/>
                    {/* Top dome */}
                    <ellipse cx="50" cy="30" rx="20" ry="8" fill="#FF9822" opacity="0.8"/>
                    {/* Bottom dome */}
                    <path d="M35 100 Q50 110 65 100" fill="#FF9822" opacity="0.8"/>
                    {/* Light glow */}
                    <ellipse cx="50" cy="65" rx="15" ry="25" fill="#FFD700" opacity="0.4"/>
                    {/* Decorative lines */}
                    <line x1="35" y1="45" x2="65" y2="45" stroke="#019147" strokeWidth="1" opacity="0.5"/>
                    <line x1="35" y1="65" x2="65" y2="65" stroke="#019147" strokeWidth="1" opacity="0.5"/>
                    <line x1="35" y1="85" x2="65" y2="85" stroke="#019147" strokeWidth="1" opacity="0.5"/>
                    <defs>
                      <linearGradient id="lanternGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FF9822" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#019147" stopOpacity="0.2"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Small star decorations */}
                <div className="absolute top-8 left-16 md:left-24 opacity-15">
                  <svg className="w-4 h-4 md:w-6 md:h-6" viewBox="0 0 24 24" fill="#FF9822">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="absolute top-12 right-16 md:right-24 opacity-15">
                  <svg className="w-3 h-3 md:w-5 md:h-5" viewBox="0 0 24 24" fill="#019147">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                
                {/* Subtle dot pattern overlay */}
                <div className="absolute inset-0 opacity-[0.04]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #019147 1.5px, transparent 0)`,
                    backgroundSize: '32px 32px'
                  }} />
                </div>
                
                {/* Content */}
                <div className="relative text-center">
                  {/* Crescent moon icon with enhanced glow */}
                  <div className="mb-3 md:mb-6 relative inline-block">
                    <div className="absolute inset-0 bg-primary-green/30 blur-2xl rounded-full scale-150" />
                    <div className="relative bg-primary-green/10 rounded-full p-4 md:p-5">
                      <svg className="w-12 h-12 md:w-20 md:h-20 mx-auto text-primary-green relative" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3 px-1 md:px-2 leading-tight">Menuju Ramadhan 1447H</h2>
                  
                  {/* Countdown box with enhanced styling */}
                  <div className="my-4 md:my-8 py-4 md:py-8 px-3 md:px-6 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border-2 border-primary-green/20 shadow-lg relative overflow-hidden">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-green/5 via-transparent to-accent-orange/5" />
                    <div className="relative">
                      <p className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-green mb-1 md:mb-2">{days}</p>
                      <p className="text-base md:text-xl font-semibold text-gray-700">Hari Lagi</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 md:space-y-2 mb-3 md:mb-6 px-1 md:px-2">
                    <p className="text-base md:text-xl font-semibold text-gray-800">18 Februari 2026</p>
                    <p className="text-[11px] md:text-sm text-gray-600 max-w-[280px] md:max-w-sm mx-auto leading-relaxed">
                      Mari persiapkan hati untuk menyambut bulan penuh berkah dan rahmat
                    </p>
                  </div>
                  
                  {/* Enhanced decorative divider */}
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 my-3 md:my-6">
                    <div className="w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-primary-green/40 to-transparent" />
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary-green/40" />
                    <div className="w-6 md:w-12 h-px bg-gradient-to-r from-transparent via-primary-green/40 to-transparent" />
                  </div>
                  
                  <p className="text-[9px] md:text-xs text-gray-500 font-medium">ramadhan.tap.web.id</p>
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="p-3 md:p-6">
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-4">
                <button
                  onClick={() => handleShare("whatsapp")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 md:gap-2 p-2.5 md:p-4 bg-[#25D366] text-white rounded-lg md:rounded-xl font-medium hover:bg-[#20BA5A] transition-colors disabled:opacity-50 text-xs md:text-base"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => handleShare("instagram")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 md:gap-2 p-2.5 md:p-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white rounded-lg md:rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 text-xs md:text-base"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 md:gap-2 p-2.5 md:p-4 bg-[#1DA1F2] text-white rounded-lg md:rounded-xl font-medium hover:bg-[#1A8CD8] transition-colors disabled:opacity-50 text-xs md:text-base"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span>Twitter</span>
                </button>

                <button
                  onClick={() => handleShare("copy")}
                  disabled={isGenerating}
                  className="flex items-center justify-center gap-1.5 md:gap-2 p-2.5 md:p-4 bg-gray-600 text-white rounded-lg md:rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 text-xs md:text-base"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Link</span>
                </button>
              </div>

              <button
                onClick={() => handleShare("download")}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 p-2.5 md:p-4 bg-primary-green text-white rounded-lg md:rounded-xl font-medium hover:bg-primary-green/90 transition-colors disabled:opacity-50 text-xs md:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {isGenerating ? "Membuat gambar..." : "Download Gambar"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
