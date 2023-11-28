export default function generateRandomName() {
    return Math.random().toString(36).substring(7);
}