import { redirect } from "next/navigation";
import { buildActivityUrl } from "@packages/curriculum/navigation";

export default function HomePage() {
  redirect(
    buildActivityUrl({
      domainId: "langue",
      trackId: "initiation-lecture-ecriture",
      levelId: "cp",
      activityType: "phoneme",
      params: { phonemeId: "9" }
    })
  );
}
