const Queue = require("bull")

const jobQueue = new Queue("job-queue")
const NUM_WORKERS = 5
const Job = require("./models/Job")
const { executeJs } = require("./executeJs")
const { executePy } = require("./executePy")

jobQueue.process(NUM_WORKERS, async ({ data }) => {
    console.log(data)
    const { id: jobId } = data
    const job = await Job.findById(jobId)
    if (job === undefined) {
        throw Error("job not found")
    }
    console.log("Fetched Job", job)
    try {
        let output
        job["startedAt"] = new Date()
        if (job.language === "js") {
            output = await executeJs(job.filepath)
        } else {
            output = await executePy(job.filepath)
        }

        job["completedAt"] = new Date()
        job["status"] = "success"
        job["output"] = output
        console.log("Fetched Job", job)

        await job.save()
    } catch (err) {
        job["completedAt"] = new Date()
        job["status"] = "error"
        job["output"] = JSON.stringify(err)
        await job.save()
    }
    return true
})

jobQueue.on('failed', (error) => {
    console.log(error.data.id, "failed", error.failedReason)
})


const addJobToQueue = async (jobId) => {
    await jobQueue.add({ id: jobId })
}

module.exports = {
    addJobToQueue,
}