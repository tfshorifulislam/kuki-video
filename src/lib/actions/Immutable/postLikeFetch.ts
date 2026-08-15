const baseUrl = process.env.NEXT_PUBLIC_API_URL

const handleLike = async (postId: number) => {
    try {
        const response = await fetch(`${baseUrl}/api/like/toggle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: postId,
                userId: "CVdqW7k9IJcIETUYv9Xah6SMlyuIylR5",
            }),
        });

        const data = await response.json();
        if (data.success) {
            console.log(data.message);
            // Ekhane apnar UI ba like count update korar state/function call korte paren
        } else {
            console.log("Failed to like:", data.message);
        }
    } catch (error) {
        console.error("Error liking post:", error);
    }
};