const informer = () => {
  const args = process.argv.slice(2)
  const entryArgs = args.length === 0 ? 'No hay argumentos de entrada' : args
  
  return {
    args: entryArgs,
    platform: process.platform,
    node: process.version,
    rss: process.memoryUsage().rss,
    path: process.cwd(),
    pid: process.pid,
    folder: '/' + process.cwd().split('\\')[process.cwd().split('\\').length - 1]
  }
}

module.exports = informer