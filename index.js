const fs = require('fs');
const cheerio = require('cheerio');
const XLSX = require('xlsx');

// Read HTML content from job.txt
// const pageUrl = "https://in.indeed.com/m/?from=gnav-compui#";
const htmlContent = fs.readFileSync('jobs.txt', 'utf8');

// Parse HTML content using Cheerio
const $ = cheerio.load(htmlContent);

// Function to extract all job details
const extractJobDetails = () => {
    const jobDetails = [];

    $('.resultContent').each((index, element) => {
        const $element = $(element);

        // Extract job title
        const jobTitle = $element.find('.jcs-JobTitle').text().trim();

        // Extract company name
        const companyName = $element.find('.css-63koeb').text().trim();

        // Extract location
        const location = $element.find('.css-1p0sjhy').text().trim();

        
        const jobType = ''; 

        // Extract posted date (if available)
        // Assuming posted date is within some specific element or attribute, adjust selector accordingly
        const postedDate = ''; // Update selector to fetch posted date

        // Extract job description (if available)
        // Assuming job description is within some specific element or attribute, adjust selector accordingly
        const jobDescription = ''; // Update selector to fetch job description

        // Push job details to array
        jobDetails.push({
            jobTitle,
            companyName,
            location,
            jobType,
            postedDate,
            jobDescription
        });
    });

    return jobDetails;
};

// Extract all job details
const allJobs = extractJobDetails();

// Function to create Excel file
const writeToExcel = (jobs) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Create worksheet data array
    const wsData = [
        ['Job Title', 'Company Name', 'Location', 'Job Type', 'Posted Date', 'Job Description']
    ];

    // Add job details to worksheet data
    jobs.forEach(job => {
        wsData.push([
            job.jobTitle,
            job.companyName,
            job.location,
            job.jobType,
            job.postedDate,
            job.jobDescription
        ]);
    });

    // Add worksheet to workbook
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Job Details');

    // Write workbook to a file
    XLSX.writeFile(wb, 'job_details.xlsx');

    console.log('Excel file generated successfully.');
};

// Call function to write data to Excel
writeToExcel(allJobs);
