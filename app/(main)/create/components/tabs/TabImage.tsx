"use client";
import { useState } from "react";
import { Select, SelectItem, Textarea, Card, CardFooter, Image } from "@nextui-org/react";

import ImageUploader from "../ImageUploader";
import RatioCard from "../RatioCard";

export default function TabImage({ modelSetter, inputText, setInputText, onSelect }: any) {

  const models = [
    { key: "Stable Diffusion", label: "Stable Diffusion" },
    { key: "Midjourney", label: "Midjourney" },
    { key: "DALL-E", label: "DALL-E" }
  ];
  const styles = [
    { name: "Pixel", model_id: "pixel-art-diffusion-xl" },
    { name: "Cartoon", model_id: "disney-pixal-cartoon" },
    { name: "Anime", model_id: "anything-v3" },
    { name: "Abstract", model_id: "neonpunk" },
    { name: "3d", model_id: "realscifi" },
    { name: "Sketch", model_id: "pencilsketchstyle" },
    { name: "Technology", model_id: "techrealistic" },
    { name: "Digital-art", model_id: "spybg" },
    { name: "Film", model_id: "realistic-vision-v13" }
  ];


  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedRatioIndex, setSelectRatioIndex] = useState<number | null>(null);

  const handleCardClick = (model_id: string) => {
    console.log(model_id);
    modelSetter(model_id);
  };
  const handleRatioClick = (index: number, width: number, height: number) => {
    setSelectRatioIndex(index);
  }

  return (
    <div className="prompt-container py-6 divide-y-1 divide-white/10">
      <div>
        <div className="mb-5">
          <p className="mb-1">Select Model</p>
          <Select
            variant="bordered"
            aria-label="select"
            placeholder="Select a model"
            labelPlacement="outside"
            classNames={{
              base: "max-w-xs",
              trigger: "h-12",
            }}>
            {models.map((model) => (
              <SelectItem key={model.key}>
                {model.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mb-5">
          <p className="mb-1">Image Prompt</p>
          <ImageUploader />
        </div>
        <div className="mb-5">
          <div className="mb-1 flex justify-between">
            <p>Text Prompt</p>
            <p>Random Prompt</p>
          </div>
          <Textarea
            variant="bordered"
            aria-label="prompt"
            labelPlacement="outside"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe something you'd like to see generated. Experiment with different words and styles..."
            className="!text-[12px] col-span-12 md:col-span-6 mb-6 md:mb-0"
          />
        </div>
        <div className="mb-5">
          <p className="mb-1">Select a Style</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-3">
            {styles.map((style, index) => (
              <Card
                key={index}
                data-model-id={style.model_id}
                isFooterBlurred
                radius="lg"
                className="border-none hover:cursor-pointer max-w-[150px]"
              >
                <Image
                  alt="Not Found"
                  className={`object-cover ${selectedImageIndex === index ? "border-[#15BFFD] border-2" : ""}`}
                  onClick={() => {
                    setSelectedImageIndex(index);
                    handleCardClick(style.model_id);
                  }}
                  height={200}
                  src={`/asset/style${index + 1}.png`}
                  width={200}
                />
                <CardFooter className="p-0 justify-center absolute bottom-1 z-10">
                  <p className="text-tiny text-white/80">{style.name}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className="mb-3">
          <p className="mb-1">Aspect Ratios</p>
          <div className="grid grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5].map((size, index) => (
              <RatioCard 
              key={index}
              size={size} 
              onSelect={(width, height) => handleRatioClick(index, width, height)}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-3 py-6">
        <div className="flex justify-center">
          <PrimaryButton text="Create Now" />
        </div>
        <p className="text-center">Cost: 2 $cNFP</p>
        <div className="py-2 bg-white/5 text-xs text-center rounded-md">
          You don't have enough $cNFP to create. Get More $cNFP
        </div>
      </div> */}
    </div>
  );
}

