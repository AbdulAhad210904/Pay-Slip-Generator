export default async function handler(req, res) {
    try {
      const response = await fetch('https://cortechdev.com/wp-content/uploads/2023/05/cropped-final-logo1.png');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      
      const imageBuffer = Buffer.from(arrayBuffer);
      
      res.setHeader('Content-Type', 'image/png');
      
      res.send(imageBuffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  