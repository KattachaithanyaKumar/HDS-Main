import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

const client = createClient({
  projectId: "8qxqidc7",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-07-12",
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

export default client;