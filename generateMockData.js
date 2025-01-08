const { faker } = require('@faker-js/faker');
const { createObjectCsvWriter } = require('csv-writer');
const { v4: uuidv4 } = require('uuid');

// Define post types and social media platforms
const postTypes =  ['carousel', 'static_image', 'reels'];
const platforms = ['instagram', 'facebook', 'linkedin', 'youtube'];

// Number of mock records to generate
const RECORD_COUNT = 100;

// Generate mock data
const generateMockData = () => {
    const data = [];

    for (let i = 0; i < RECORD_COUNT; i++) {
        const postType = faker.helpers.arrayElement(postTypes);
        const platform = faker.helpers.arrayElement(platforms);
        const likes = faker.number.int({ min: 1000, max: 100000 });
        const shares = faker.number.int({ min: 1000, max: 100000 });
        const comments = faker.number.int({ min: 1000, max: 100000 });
        const reach = faker.number.int({ min: 10000, max: 1000000 });
        const caption = faker.lorem.sentence();
        const createdAt = faker.date.between({ from: '2024-01-01', to: '2024-12-31' });
        const author = faker.internet.userName();
        const thumbnailUrl = faker.image.url();

        data.push({
            post_id: uuidv4(),
            platform,
            post_type: postType,
            likes,
            shares,
            comments,
            reach,
            caption,
            created_at: createdAt.toISOString(),
            author,
            thumbnail_url: thumbnailUrl,
        });
    }
    return data;
};

// Write mock data to CSV
const writeDataToCsv = async (data) => {
    const csvWriter = createObjectCsvWriter({
        path: 'engagement_data.csv',
        header: [
            { id: 'post_id', title: 'post_id' },
            { id: 'platform', title: 'platform' },
            { id: 'post_type', title: 'post_type' },
            { id: 'likes', title: 'likes' },
            { id: 'shares', title: 'shares' },
            { id: 'comments', title: 'comments' },
            { id: 'reach', title: 'reach' },
            { id: 'caption', title: 'caption' },
            { id: 'created_at', title: 'created_at' },
            { id: 'author', title: 'author' },
            { id: 'thumbnail_url', title: 'thumbnail_url' },
        ],
    });

    try {
        await csvWriter.writeRecords(data);
        console.log("Records written");
    } catch (err) {
        console.error("Error writing records", err);
    }
};

// Main function to generate and save data
const main = async () => {
    const mockData = generateMockData();
    await writeDataToCsv(mockData);
};

main();
