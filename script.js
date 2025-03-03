document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const dropArea = document.getElementById("drop-area");
    const fileList = document.getElementById("file-list");
    const mostFrequentSection = document.getElementById("most-frequent");
    const mediumFrequentSection = document.getElementById("medium-frequent");
    const leastFrequentSection = document.getElementById("least-frequent");

    if (!fileInput || !dropArea || !fileList || !mostFrequentSection) {
        console.error("One or more required elements are missing.");
        return;
    }

    fileInput.addEventListener("change", function (event) {
        handleFiles(event.target.files);
    });

    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("highlight");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("highlight");
    });

    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dropArea.classList.remove("highlight");
        handleFiles(event.dataTransfer.files);
    });

    function handleFiles(files) {
        for (let file of files) {
            if (isValidFileType(file)) {
                uploadFile(file);
            } else {
                alert("Invalid file type. Please upload PDF, TXT, DOC, or DOCX files.");
            }
        }
    }

    function isValidFileType(file) {
        const validTypes = ["application/pdf", "text/plain", "application/msword", 
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        return validTypes.includes(file.type);
    }

    function uploadFile(file) {
        let formData = new FormData();
        formData.append("file", file);

        fetch("/upload", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(text => {
            try {
                let data = JSON.parse(text);
                if (data.error) {
                    alert(data.error);
                } else {
                    displayQuestions(data.questions);
                    displayFile(file);
                }
            } catch (error) {
                console.error("Server response was not JSON:", text);
            }
        })
        .catch(error => console.error("Error:", error));
    }

    function displayFile(file) {
        const fileItem = document.createElement("div");
        fileItem.classList.add("file-item");
        fileItem.innerHTML = `
            <p>${file.name}</p>
            <button class="delete-btn">Delete</button>
        `;

        fileItem.querySelector(".delete-btn").addEventListener("click", function () {
            fileItem.remove();
            checkFileListEmpty();
        });

        fileList.appendChild(fileItem);
    }

    function checkFileListEmpty() {
        if (fileList.children.length === 0) {
            fileList.innerHTML = "<p>No files uploaded</p>";
            dropArea.innerHTML = '<p>Drag & Drop your files or <label for="fileInput" class="browse-link">Browse</label></p>';
            dropArea.appendChild(fileInput);
        }
    }

    function displayQuestions(questions) {
        mostFrequentSection.innerHTML = "<h3>Most Frequent</h3>";
        mediumFrequentSection.innerHTML = "<h3>Medium Frequent</h3>";
        leastFrequentSection.innerHTML = "<h3>Least Frequent</h3>";

        questions.sort((a, b) => b.frequency - a.frequency); // Sort by frequency (highest to lowest)

        questions.forEach((q, index) => {
            let div = document.createElement("div");
            div.classList.add("question");
            div.innerHTML = `<p>${q.question}</p> <span>Frequency: ${q.frequency}</span>`;

            if (index < questions.length * 0.3) {
                mostFrequentSection.appendChild(div);
            } else if (index < questions.length * 0.6) {
                mediumFrequentSection.appendChild(div);
            } else {
                leastFrequentSection.appendChild(div);
            }
        });
    }
});

