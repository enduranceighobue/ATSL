import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Nav from "./Nav";
import Footer from "../components/Footer";
import DemoModal from "../components/DemoModal";
import VideoModal from "../components/VideoModal";
import { getProduct, PLACEHOLDER_YOUTUBE_ID } from "../data/products";
import WalkthroughSlider from "../components/WalkthroughSlider";

export default function ProductDetail({ slug }) {
  const product = getProduct(slug);

  useEffect(() => {
    if (!product) return undefined;
    document.title = `${product.displayName} | ATSL`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "ATSL";
    };
  }, [product]);

  const [demoOpen, setDemoOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const closeDemo = useCallback(() => setDemoOpen(false), []);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  if (!product) {
    return (
      <>
        <Nav />
        <main className="bg-[#fffbf2] px-6 py-24 text-center">
          <h1 className="text-3xl font-bold text-[#291a06]">Product not found</h1>
          <Link to="/" className="mt-6 inline-block text-amber-700 underline">
            Back home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="bg-[#fffbf2]">
        <section className="px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto flex w-full max-w-sm flex-col items-center">
            <h1 className="sr-only">{product.displayName}</h1>
            <div
              className={`flex h-40 w-full items-center justify-center rounded-2xl px-5 sm:h-48 ${product.logoBg} ${
                product.logoBg === "bg-white" ? "border border-amber-100 shadow-sm" : ""
              }`}
            >
              <img
                src={product.logo}
                alt={`${product.displayName} logo`}
                className="max-h-32 w-full object-contain sm:max-h-36"
              />
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex cursor-pointer items-center rounded-full border border-[#291a06] px-6 py-3 text-sm font-semibold text-[#291a06] transition hover:bg-[#291a06] hover:text-white"
              >
                Book a demo
              </button>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#291a06] px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
              >
                Watch video
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {product.gallery.length > 0 && (
          <WalkthroughSlider
            title={`Inside ${product.displayName}`}
            slides={product.gallery}
          />
        )}
      </main>
      <DemoModal
        open={demoOpen}
        onClose={closeDemo}
        productName={product.displayName}
      />
      <VideoModal
        open={videoOpen}
        onClose={closeVideo}
        youtubeId={product.video.youtubeId || PLACEHOLDER_YOUTUBE_ID}
        title={`${product.displayName} video`}
      />
      <Footer />
    </>
  );
}
