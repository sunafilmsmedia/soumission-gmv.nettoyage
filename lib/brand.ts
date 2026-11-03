// IDs de suivi publics (visibles dans le code source de toute façon) :
// versionnés en dur pour que le site fonctionne sans configuration Vercel,
// mais surchageables par variable d'environnement au besoin.
export const GMV_META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1193900955465527";
export const GMV_CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "z81cwfmant";
