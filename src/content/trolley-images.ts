// Project-owned CDN images for the imported proposal.
import katie from "@/assets/photos/katie_podcast.json";
import katieStudio from "@/assets/photos/katie_studio.json";
import jenna from "@/assets/photos/jenna_sofa.json";
import jennaClose from "@/assets/photos/jenna_close.json";
import tony from "@/assets/photos/tony_board.json";
import tonySit from "@/assets/photos/tony_sit.json";
import rob from "@/assets/photos/rob_logs.json";
import robStudio from "@/assets/photos/rob_studio.json";
import katieLifestyle from "@/assets/proposal-two/katie-lifestyle.jpg";
import jennaLifestyle from "@/assets/proposal-two/jenna-lifestyle.jpg";
import tonyLifestyle from "@/assets/proposal-two/tony-lifestyle.jpg";
import robLifestyle from "@/assets/proposal-two/rob-lifestyle.jpg";
export const trolleyImages: Record<string, string> = {
  "/images/img0.jpg": "/__l5e/assets-v1/32c0e74d-ad48-48ab-9834-431cc14c201f/proposal-two-img0.jpg",
  "/images/img1.jpg": "/__l5e/assets-v1/252ad95f-5fbd-4431-a3d9-96262241ef5b/proposal-two-img1.jpg",
  "/images/img10.jpg": "/__l5e/assets-v1/7437ab04-ddaf-4e42-aee9-045d68b134c7/proposal-two-img10.jpg",
  "/images/img2.jpg": "/__l5e/assets-v1/2edd883c-0f7d-45f7-8226-c69e3305215c/proposal-two-img2.jpg",
  "/images/img3.jpg": "/__l5e/assets-v1/4bb25881-cdb0-42eb-8919-58ad16b6c23b/proposal-two-img3.jpg",
  "/images/img4.jpg": "/__l5e/assets-v1/93848333-6c6e-4398-a8b2-7ed2d3143c0b/proposal-two-img4.jpg",
  "/images/img5.jpg": "/__l5e/assets-v1/7956cecb-91e2-4ddf-bfc6-4acf3135d9e1/proposal-two-img5.jpg",
  "/images/img6.jpg": "/__l5e/assets-v1/5eda6e96-0ae6-4227-81a9-f56d07fcf78b/proposal-two-img6.jpg",
  "/images/img7.jpg": "/__l5e/assets-v1/510241c7-3c6a-472a-9007-c0c8f3b216a0/proposal-two-img7.jpg",
  "/images/img8.jpg": "/__l5e/assets-v1/a58b64f7-604e-449c-9229-b3bd0794bf9a/proposal-two-img8.jpg",
  "/images/img9.jpg": "/__l5e/assets-v1/60077c26-c3e0-44f0-bd74-c6046d541c08/proposal-two-img9.jpg",
  "/images/talent/jenna-1.jpg": "/__l5e/assets-v1/2c394061-e8d8-4706-85f4-3bcae16da36a/proposal-two-jenna-1.jpg",
  "/images/talent/jenna-2.jpg": "/__l5e/assets-v1/8b071742-b97f-44ef-b58a-34612d607d75/proposal-two-jenna-2.jpg",
  "/images/talent/jenna-3.jpg": "/__l5e/assets-v1/b756b432-ac3d-483e-8aa3-f3298da6bb35/proposal-two-jenna-3.jpg",
  "/images/talent/katie-1.jpg": "/__l5e/assets-v1/e5abf5fb-d1ea-401e-8965-6fc343ab7ba1/proposal-two-katie-1.jpg",
  "/images/talent/katie-2.jpg": "/__l5e/assets-v1/8dbd1103-d357-41ce-939d-a3cd2e0f6788/proposal-two-katie-2.jpg",
  "/images/talent/katie-3.jpg": "/__l5e/assets-v1/aa318855-50aa-4a01-ae6a-6b131a5d12a4/proposal-two-katie-3.jpg",
  "/images/talent/rob-1.jpg": "/__l5e/assets-v1/9984b4e1-0899-4eae-b8ee-d4ec30bba63a/proposal-two-rob-1.jpg",
  "/images/talent/rob-2.jpg": "/__l5e/assets-v1/233c476b-0a01-49e7-8202-a04f2f760ce0/proposal-two-rob-2.jpg",
  "/images/talent/rob-3.jpg": "/__l5e/assets-v1/a34095b7-f65e-4e64-a061-fdb68faeaba6/proposal-two-rob-3.jpg",
  "/images/talent/tony-1.jpg": "/__l5e/assets-v1/e514084e-ab02-460a-a61a-2a2d70aabb67/proposal-two-tony-1.jpg",
  "/images/talent/tony-2.jpg": "/__l5e/assets-v1/2dfeb7e1-301f-4a8d-b8b7-0a6618b8ca94/proposal-two-tony-2.jpg",
  "/images/talent/tony-3.jpg": "/__l5e/assets-v1/21d18f35-17ba-4e46-9970-aeab8913e603/proposal-two-tony-3.jpg",
};

Object.assign(trolleyImages, {
  "/images/img2.jpg": katie.url,
  "/images/img4.jpg": katie.url,
  "/images/img5.jpg": jenna.url,
  "/images/img6.jpg": tony.url,
  "/images/img7.jpg": rob.url,
  "/images/img8.jpg": katie.url,
  "/images/talent/katie-1.jpg": katieLifestyle,
  "/images/talent/katie-2.jpg": katie.url,
  "/images/talent/katie-3.jpg": katieStudio.url,
  "/images/talent/jenna-1.jpg": jennaLifestyle,
  "/images/talent/jenna-2.jpg": jenna.url,
  "/images/talent/jenna-3.jpg": jennaClose.url,
  "/images/talent/tony-1.jpg": tonyLifestyle,
  "/images/talent/tony-2.jpg": tony.url,
  "/images/talent/tony-3.jpg": tonySit.url,
  "/images/talent/rob-1.jpg": robLifestyle,
  "/images/talent/rob-2.jpg": rob.url,
  "/images/talent/rob-3.jpg": robStudio.url,
});
