import chalk from 'chalk';

export const server = (app,port) =>{
    app.listen(port, error => {
    if (error)
      console.log('%s An error ocurred: %s ', chalk.green('✓'), error)
    else
      console.log('%s App is running at http://localhost:%d',chalk.green('✓'),port)
    })
};