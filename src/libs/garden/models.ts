
interface Plant {
    userId: string,
    plantId: string,
    name: string,
    createdAt: string,
    photos: Array<string>
}

interface CreatePlantRequest {
    name: string
}