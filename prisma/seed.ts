import { PrismaClient } from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@careerhub.com",
      role: "ADMIN",
      image: faker.image.avatar(),
    },
  })

  // Create employers
  const employers = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          role: "EMPLOYEER",
          image: faker.image.avatar(),
        },
      }),
    ),
  )

  // Create job seekers with profiles
  const jobSeekers = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const user = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          role: "JOB_SEEKER",
          image: faker.image.avatar(),
          Profile: {
            create: {
              location: `${faker.location.city()}, ${faker.location.country()}`,
              summary: faker.lorem.paragraphs(2),
              website: faker.internet.url(),
              skills: faker.helpers.arrayElements([
                "JavaScript",
                "Python",
                "Java",
                "React",
                "Node.js",
                "AWS",
                "Docker",
                "PostgreSQL",
              ]),
              experiences: {
                create: Array.from({
                  length: faker.number.int({ min: 1, max: 4 }),
                }).map(() => ({
                  role: faker.person.jobTitle(),
                  company: faker.company.name(),
                  current: faker.datatype.boolean(),
                  years: faker.number.int({ min: 1, max: 10 }),
                })),
              },
              educations: {
                create: Array.from({
                  length: faker.number.int({ min: 1, max: 3 }),
                }).map(() => ({
                  institution: faker.company.name(),
                  degree: faker.helpers.arrayElement([
                    "B.Sc",
                    "M.Sc",
                    "MBA",
                    "PhD",
                  ]),
                  field: faker.helpers.arrayElement([
                    "Computer Science",
                    "Business Administration",
                    "Electrical Engineering",
                  ]),
                })),
              },
            },
          },
        },
      })
      return user
    }),
  )

  // Create jobs with salary ranges
  const jobs = []
  for (const employer of employers) {
    const numJobs = faker.number.int({ min: 3, max: 6 })
    for (let i = 0; i < numJobs; i++) {
      const salaryRange = await prisma.salaryRange.create({
        data: {
          min: faker.number.int({ min: 40000, max: 80000 }),
          max: faker.number.int({ min: 80000, max: 200000 }),
        },
      })

      const job = await prisma.job.create({
        data: {
          title: faker.person.jobTitle(),
          description: faker.lorem.paragraphs(5),
          employerId: employer.id,
          location: `${faker.location.city()}, ${faker.location.country()}`,
          salaryRangeId: salaryRange.id,
          closingDate: faker.date.future({ years: 0.5 }),
          active: faker.datatype.boolean(),
          tags: faker.helpers.arrayElements(
            ["Full-time", "Contract", "Senior", "Junior"],
            3,
          ),
          type: faker.helpers.arrayElement(["OFFICE", "REMOTE", "HYBRID"]),
        },
      })
      jobs.push(job)
    }
  }

  // Create applications
  for (const job of jobs) {
    const applicants = faker.helpers.arrayElements(
      jobSeekers,
      faker.number.int({ min: 2, max: 8 }),
    )
    for (const applicant of applicants) {
      await prisma.application.create({
        data: {
          state: faker.helpers.arrayElement([
            "PENDING",
            "ACCEPTED",
            "REJECTED",
          ]),
          jobId: job.id,
          userId: applicant.id,
        },
      })
    }
  }

  // Create job comments
  for (const job of jobs) {
    const commenters = faker.helpers.arrayElements(
      [...employers, ...jobSeekers],
      faker.number.int({ min: 3, max: 10 }),
    )
    for (const commenter of commenters) {
      await prisma.jobComment.create({
        data: {
          content: faker.lorem.paragraph(),
          jobId: job.id,
          writerId: commenter.id,
        },
      })
    }
  }

  // Create posts and interactions
  const posts = []
  const allUsers = [...employers, ...jobSeekers]
  for (const user of allUsers) {
    const userPosts = await Promise.all(
      Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() =>
        prisma.post.create({
          data: {
            content: faker.lorem.paragraphs(3),
            title: faker.lorem.sentence(),
            createrId: user.id,
          },
        }),
      ),
    )
    posts.push(...userPosts)
  }

  // Create post interactions
  for (const post of posts) {
    // Add likes
    const likers = faker.helpers.arrayElements(
      allUsers,
      faker.number.int({ min: 2, max: 15 }),
    )
    await prisma.post.update({
      where: { id: post.id },
      data: {
        likes: {
          connect: likers.map(liker => ({ id: liker.id })),
        },
      },
    })

    // Add comments
    const commenters = faker.helpers.arrayElements(
      allUsers,
      faker.number.int({ min: 2, max: 8 }),
    )
    for (const commenter of commenters) {
      await prisma.postComment.create({
        data: {
          content: faker.lorem.sentence(),
          userId: commenter.id,
          postId: post.id,
        },
      })
    }
  }

  // Create notifications
  for (const user of allUsers) {
    await prisma.notification.createMany({
      data: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }).map(
        () => ({
          userId: user.id,
          title: faker.lorem.words(4),
          content: faker.lorem.sentence(),
          link: faker.internet.url(),
          recevided: faker.datatype.boolean(),
        }),
      ),
    })
  }

  console.log("Seed data created:")
  console.log(`- 1 admin user`)
  console.log(`- ${employers.length} employers`)
  console.log(`- ${jobSeekers.length} job seekers`)
  console.log(`- ${jobs.length} jobs`)
  console.log(`- ${posts.length} posts`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
