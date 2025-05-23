"use client";

import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { ColumnsPhotoAlbum } from "react-photo-album";

import styles from "./page.module.css";
import "react-photo-album/columns.css";
import "react-photo-album/masonry.css";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";

import BreadIco from "./components/logo";
import FooterContent from "./components/footer-content";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface Photo {
  id: string | number;
  attributes: {
    name: string;
    img: {
      data: {
        attributes: {
          formats: {
            thumbnail: { url: string };
            small: { url: string; width: number; height: number };
            medium: { url: string; width: number; height: number };
            large: { url: string; width: number; height: number };
          };
          url: string;
          width: number;
          height: number;
        };
      };
    };
  };
}

interface ApiResponse {
  data: Photo[];
}

const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState<number>(-1);
  const [logoColor, setLogoColor] = useState<string>("rgb(128, 128, 128)"); // Zaczynamy od szarego koloru
  const [defaultColumns, setDefaultColumns] = useState<number>(2);
  const [manualColumns, setManualColumns] = useState<number | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
         "https://tbread-art-cms.onrender.com/api/photos?populate=*&pagination[limit]=-1"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data: ApiResponse = await response.json();
        setPhotos(data.data);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    const updateColumns = () => {
      let columns: number;
      if (window.innerWidth < 600) columns = 3;
      else if (window.innerWidth < 900) columns = 3;
      else columns = 3;

      if (manualColumns === null) {
        // Tylko aktualizuj defaultColumns jeśli użytkownik nie zmienił kolumn manualnie
        setDefaultColumns(columns);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [manualColumns]);

  const handleColumnChange = () => {
    setManualColumns((prevColumns) => {
      const newColumns =
        ((prevColumns !== null ? prevColumns : defaultColumns) % 4) + 1;
      return newColumns;
    });
  };

  const columnsToDisplay =
    manualColumns !== null ? manualColumns : defaultColumns;

  useEffect(() => {
    const handleScroll = () => {
      if (logoRef.current) {
        const scrollPosition = window.scrollY || window.pageYOffset;
        const maxScroll = 150;
        const intensity = Math.min(scrollPosition / maxScroll, 1);

        const colorValue = 128 + Math.round(intensity * (255 - 128));
        setLogoColor(`rgb(${colorValue}, ${colorValue}, ${colorValue})`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading)
    return (
      <div className="loading">
        <svg
          width="94"
          height="84"
          viewBox="0 0 94 84"
          xmlns="http://www.w3.org/2000/svg"
          className="rotating"
        >
          <path
            id="path1"
            d="M67.301 83.498H10.107C9.18298 83.498 8.43498 82.75 8.43498 81.826V30.452C3.44398 28.759 0.914978 25.985 0.914978 22.187C0.914978 12.59 17.515 5.07501 38.701 5.07501C59.891 5.07501 76.493 12.591 76.493 22.187C76.493 25.981 73.964 28.759 68.973 30.452V81.827C68.975 82.75 68.227 83.498 67.301 83.498ZM11.78 80.152H65.629V29.22C65.629 28.471 66.126 27.815 66.844 27.609C72.494 26.007 73.147 23.75 73.147 22.187C73.147 15.538 59.306 8.42101 38.703 8.42101C18.1 8.42101 4.26298 15.538 4.26298 22.187C4.26298 23.75 4.91598 26.011 10.566 27.609C11.286 27.815 11.782 28.471 11.782 29.22V80.152H11.78Z"
            fill="black"
          />
          <path
            id="path2"
            d="M67.301 83.498C66.692 83.498 66.1 83.158 65.805 82.574C65.393 81.747 65.727 80.744 66.553 80.329L74.219 76.496V24.923C74.219 24.174 74.715 23.518 75.435 23.312C81.084 21.714 81.739 19.453 81.739 17.891C81.739 11.241 67.901 4.12401 47.298 4.12401C36.143 4.12401 25.574 6.39502 19.029 10.202C18.232 10.66 17.206 10.395 16.742 9.59402C16.277 8.79702 16.55 7.77401 17.349 7.30701C24.486 3.15701 35.4 0.778015 47.297 0.778015C68.485 0.778015 85.084 8.29302 85.084 17.891C85.084 21.688 82.555 24.462 77.564 26.155V77.53C77.564 78.163 77.206 78.741 76.64 79.026L68.049 83.323C67.811 83.443 67.554 83.498 67.301 83.498Z"
            fill="black"
          />
          <path
            id="path3"
            d="M83.411 73.883C82.486 73.883 81.738 73.134 81.738 72.209V67.607C81.738 66.682 82.486 65.934 83.411 65.934C84.335 65.934 85.084 66.682 85.084 67.607V72.209C85.084 73.134 84.335 73.883 83.411 73.883Z"
            fill="black"
          />
          <path
            id="path4"
            d="M83.411 62.589C82.486 62.589 81.738 61.84 81.738 60.916V29.128C81.738 28.425 82.176 27.798 82.833 27.556C90.034 24.912 89.741 18.426 89.725 18.152C89.671 17.234 90.369 16.44 91.287 16.381C92.266 16.316 93 17.008 93.064 17.927C93.274 20.953 91.829 27.213 85.085 30.253V60.917C85.084 61.84 84.335 62.589 83.411 62.589Z"
            fill="black"
          />
          <path
            id="path5"
            d="M43.319 67.817C42.702 67.817 42.11 67.473 41.819 66.882C41.411 66.052 41.752 65.052 42.581 64.645C44.208 63.843 49.967 58.446 50.47 56.495C50.019 56.393 48.778 56.321 45.853 57.024C32.89 60.131 28.58 60.271 27.352 57.609C26.381 55.499 27.78 52.743 37.726 45.547C44.392 40.728 46.392 38.479 46.994 37.548C45.716 37.404 41.831 37.675 30.554 41.064C26.963 42.146 23.484 42.838 22.349 40.591C21.832 39.568 20.269 36.453 38.62 22.768C39.354 22.209 40.404 22.359 40.959 23.108C41.512 23.85 41.361 24.896 40.62 25.448C34.307 30.159 27.424 36.156 25.784 38.715C26.457 38.66 27.627 38.454 29.594 37.862C45.384 33.111 49.158 33.549 50.322 35.917C51.368 38.032 49.957 40.835 39.688 48.26C33.069 53.05 31.193 55.226 30.661 56.095C31.902 56.308 35.402 56.089 45.074 53.769C48.531 52.936 52.649 52.345 53.678 55.195C55.224 59.471 45.343 67.013 44.063 67.643C43.82 67.763 43.568 67.817 43.319 67.817Z"
            fill="black"
          />
        </svg>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const imageSet = photos
    .map((photo) => ({
      src: photo.attributes.img.data.attributes.formats.large.url,
      width: photo.attributes.img.data.attributes.formats.large.width,
      height: photo.attributes.img.data.attributes.formats.large.height,
      alt: photo.attributes.name,
    }))
    .reverse();

  const originalImageSet = photos
    .map((photo) => ({
      src: photo.attributes.img.data.attributes.url,
      width: photo.attributes.img.data.attributes.width,
      height: photo.attributes.img.data.attributes.height,
      alt: photo.attributes.name,
    }))
    .reverse();

  return (
    <div className={styles.container}>
      <Head>
        <title>TOMASZBREAD.ART</title>
      </Head>
      <header className="stickyAvatar">
        <div className="headerContent">
          <div className="avatar" ref={logoRef}>
            <BreadIco color={logoColor} />
          </div>
          <div className="gridIcon" ref={logoRef}>
            <button className="girdButton" onClick={handleColumnChange}>
            <svg  width="40" height="80" viewBox="0 0 80 0.1"  color={logoColor}  xmlns="http://www.w3.org/2000/svg">
<path fill={logoColor}  d="M57.2308 45.5385C65.3876 45.5385 72 38.926 72 30.7692C72 22.6124 65.3876 16 57.2308 16C49.0739 16 42.4615 22.6124 42.4615 30.7692C42.4615 38.926 49.0739 45.5385 57.2308 45.5385Z" />
<path fill={logoColor}  d="M35.0769 16H10.4615C9.10207 16 8 17.1021 8 18.4615V43.0769C8 44.4364 9.10207 45.5385 10.4615 45.5385H35.0769C36.4364 45.5385 37.5385 44.4364 37.5385 43.0769V18.4615C37.5385 17.1021 36.4364 16 35.0769 16Z"  />
<path fill={logoColor} d="M35.0769 50.4615H10.4615C9.10207 50.4615 8 51.5636 8 52.9231V77.5385C8 78.8979 9.10207 80 10.4615 80H35.0769C36.4364 80 37.5385 78.8979 37.5385 77.5385V52.9231C37.5385 51.5636 36.4364 50.4615 35.0769 50.4615Z"  />
<path fill={logoColor} d="M69.5385 50.4615H44.9231C43.5636 50.4615 42.4615 51.5636 42.4615 52.9231V77.5385C42.4615 78.8979 43.5636 80 44.9231 80H69.5385C70.8979 80 72 78.8979 72 77.5385V52.9231C72 51.5636 70.8979 50.4615 69.5385 50.4615Z"  />
</svg>


            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.fade}>
          <ColumnsPhotoAlbum
            columns={columnsToDisplay}
            photos={imageSet}
            onClick={({ index: current }) => setIndex(current)}
          />
          <Lightbox
            slides={originalImageSet}
            index={index}
            open={index >= 0}
            plugins={[Zoom]}
            close={() => setIndex(-1)}
          />
        </div>
      </main>
      <footer>
        <FooterContent />
      </footer>
    </div>
  );
};

export default Home;
