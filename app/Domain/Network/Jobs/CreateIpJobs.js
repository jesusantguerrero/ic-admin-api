const Ip = use('App/Models/Ip');

module.exports = async (job, done) => {
  // job.data contains the custom data passed when the job was created
  // job.id contains id of this job.
  let totalIps = 255;
  for (let currentIp =1; currentIp <= totalIps; currentIp++) {
    const router = job.data.router;

    await Ip.create({
         router_id: router.id,
         company_id: router.company_id,
         index: currentIp,
         final_code: `${router.base_ip}${router.codigo_area}.${currentIp}`,
         status: getStatus(currentIp)
     })

     // transcode video asynchronously and report progress
     job.progress(currentIp / totalIps * 100);
 }

  // call done when finished
  done();
};


function getStatus(index) {
  return [1, 254, 255].includes(index) ? 3 : 0;
}